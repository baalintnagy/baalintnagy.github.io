package org.nb;

import java.util.Arrays;
import java.util.Collection;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

public class BehaviorInjection {

    public static interface Behavior<T> {
        Set<Class<? extends T>> supported();

        void perform(T on);
    }

    public static class BehaviorResolver {

        private final Map<Class<?>, Behavior<?>> behaviors;
        private final SuperTypeResolver superTypeResolver;

        public BehaviorResolver(Collection<Behavior<?>> behaviors, SuperTypeResolver superTypeResolver) {
            this.behaviors = behaviors.parallelStream()
                    .flatMap(b -> b.supported().stream().map(cls -> Map.entry(cls, b)))
                    .collect(Collectors.toUnmodifiableMap(
                            Map.Entry::getKey,
                            Map.Entry::getValue
                    ));
            this.superTypeResolver = superTypeResolver;
        }

        @SuppressWarnings("unchecked")
        public <T> Behavior<T> resolveBehavior(Class<?> cls) {
            return Behavior.class.cast(
                    behaviors.get(
                            superTypeResolver.resolveSuperTypeIn(cls, behaviors.keySet())
                                    .get()));
        }

    }

    @FunctionalInterface
    public static interface SuperTypeResolver {
        Supplier<Class<?>> resolveSuperTypeIn(Class<?> type, Set<Class<?>> candidates);

    }

    public static class CachedSuperTypeResolver implements SuperTypeResolver {

        private final Map<Class<?>, Supplier<Class<?>>> cache = new ConcurrentHashMap<>();
        private final SuperTypeResolver delegate;

        public CachedSuperTypeResolver(SuperTypeResolver delegate) {
            this.delegate = delegate;
        }

        @Override
        public Supplier<Class<?>> resolveSuperTypeIn(Class<?> type, Set<Class<?>> candidates) {
            return cache.computeIfAbsent(type, t -> delegate.resolveSuperTypeIn(t, candidates));
        }

    }

    public static class BfsSuperTypeResolver implements SuperTypeResolver {

        @Override
        public Supplier<Class<?>> resolveSuperTypeIn(Class<?> type, Set<Class<?>> candidates) {
            Set<Class<?>> currentLevel = Set.of(type);

            while (!currentLevel.isEmpty()) {
                Set<Class<?>> matches = Util.intersect(candidates, currentLevel);

                if (matches.size() == 1) {
                    return () -> Util.first(matches);
                }

                if (matches.size() > 1) {
                    return () -> {
                        throw new IllegalArgumentException("Ambiguous match for: " + type + " → " + matches);
                    };
                }

                currentLevel = levelUp(currentLevel);
            }

            return () -> null; // not found
        }

        private static Set<Class<?>> levelUp(Set<Class<?>> currentLevel) {
            return currentLevel.stream()
                    .flatMap(cls -> Stream.concat(
                            Stream.of(cls.getSuperclass()).filter(Objects::nonNull),
                            Arrays.stream(cls.getInterfaces())))
                    .collect(Collectors.toSet());
        }

    }

    public static final class Util {

        private Util() {
        }

        static <T> Set<T> intersect(Set<T> a, Set<T> b) {
            return a.stream()
                    .filter(b::contains)
                    .collect(Collectors.toSet());
        }

        static <T> T first(Iterable<T> set) {
            for (T t : set) {
                return t;
            }
            return null;
        }

        @SuppressWarnings("unchecked")
        static <I extends Behavior<?>, O extends Behavior<?>> Collection<O> castBehaviors(Collection<I> in) {
            return Collection.class.cast(in);
        }

    }

    @Slf4j
    @SpringBootApplication
    public static class EventHandlerExample {

        public static interface EventHandler<E> extends Behavior<E> {
        }

        @Configuration
        public static class SuperTypeResolverConfig {
            @Bean
            SuperTypeResolver superTypeResolver() {
                return new CachedSuperTypeResolver(new BfsSuperTypeResolver());
            }
        }

        @Component
        public static class EventHandlerProvider extends BehaviorResolver {

            public EventHandlerProvider(Collection<EventHandler<?>> behaviors, SuperTypeResolver superTypeResolver) {
                super(Util.castBehaviors(behaviors), superTypeResolver);
            }

        }

        static class AppEvent {
        }

        static class LoginEvent extends AppEvent {
        }

        static interface Remote {
        }

        static interface PersistentRemote extends Remote {
        }

        static class RemoteLoginEvent extends LoginEvent implements Remote {
        }

        static class PersistentRemoteEvent implements PersistentRemote {
        }


        @Component
        public static class AppEventHandler implements EventHandler<AppEvent> {

            @Override
            public Set<Class<? extends AppEvent>> supported() {
                return Set.of(AppEvent.class);
            }

            @Override
            public void perform(AppEvent on) {
                log.warn(">>> [{}] handles [{}]", getClass().getSimpleName(), on.getClass().getSimpleName());
            }
        }

        @Component
        public static class RemoteHandler implements EventHandler<Remote> {

            @Override
            public Set<Class<? extends Remote>> supported() {
                return Set.of(Remote.class, PersistentRemote.class);
            }

            @Override
            public void perform(Remote on) {
                log.warn(">>> [{}] handles remote [{}]", getClass().getSimpleName(), on.getClass().getSimpleName());
            }
        }

        @Component
        public static class Main {

            @Autowired
            private EventHandlerProvider eventHandlerProvider;

            @PostConstruct
            public void main() {
                Stream.of(
                        new AppEvent(),
                        new LoginEvent(),
                        new RemoteLoginEvent(),
                        new PersistentRemoteEvent())
                        .forEach(x -> eventHandlerProvider.resolveBehavior(x.getClass()).perform(x));

            }

        }

    }

    public static void main(String[] args) {
        SpringApplication.run(EventHandlerExample.class, args);
    }

}
