
# Semitone Vector Chord/Voicing Notation (SVCvN)

## 1. Purpose

Semitone Vector Chord/Voicing Notation (SVCvN) is a compact representation of chords and voicings.

The goals are:

- Preserve exact pitch content and voicing
- Remain compact and readable by humans
- Be easy to parse programmatically
- Avoid ambiguities present in traditional chord symbols

Traditional chord notation encodes harmonic interpretation but often omits voicing and sometimes pitch content. SVCvN encodes pitch structure directly.

---

## 2. Core Principles

A chord is represented as:

Root[vector]

Example:

C[0,4,7]

### Meaning

- The root is written using standard note names (C, D, Eb, F#, etc.)
- The vector contains semitone distances from the root, modulo 12
- 0 always represents the root pitch class
- Numbers range from 0 to 11

These values represent pitch classes, not absolute pitches.

---

## 3. Octave Translation

Octave displacement is indicated using the dot operator (·).

### Rules

| Form | Meaning |
|------|--------|
| ·n | pitch class n, one octave below |
| n· | pitch class n, one octave above |
| ··n | two octaves below |
| n·· | two octaves above |

This allows all values to remain in the 0–11 range without using negative numbers or large integers.

---

## 4. Ordering

Elements inside the vector are interpreted as a sequence of tones, ordering shall be be used to indicate intended vertical structure.

The lowest pitch the bass...

Example:

C[·4,0,7]

Bass: E below C  
Chord tones: E–C–G

Equivalent traditional notation:

C/E

---

## 5. Examples

### Major Triad

C[0,4,7]

Traditional:

C

---

### Minor Seventh

A[0,3,7,10]

Traditional:

Am7

---

### Major Ninth

C[0,4,7,11,2·]

Traditional:

Cmaj9

---

### Lydian Voicing With Bass

C[·4,0,2,7,11,6·]

Decoded tones:

- E below root
- C, D, G, B
- F# above

Traditional approximation:

Cmaj9(#11)/E

---

### Dense Cluster Example

C[0,1,2,3,4]

Traditional notation:

No concise equivalent; typically written in staff notation.

---

## 6. Advantages Over Traditional Chord Notation

### 6.1 Voicing Is Explicit

Traditional:

Cmaj7

Ambiguous:
- Which inversion?
- Which spacing?
- Is the 5th present?

SVCvN:

C[·11,0,4,7]

Traditional:

Cmaj7/B

Exact pitches known: B C E G

---

### 6.2 No Naming Explosion

Traditional chord names can become long and irregular:

Cmaj7(#11,add9,no5)/E

SVCvN:

C[·4,0,2,11,6·]

Shorter and structurally clearer.

---

### 6.3 Machine-Friendly

Parsing requires only:

- Root note
- Integer list
- Octave markers

No large grammar of chord types is required.

---

### 6.4 No Functional Assumptions

Traditional notation mixes:

- Structure
- Function
- Style conventions

Example:

C6

Could function as:
- C6
- Am7/C

SVCvN encodes only the pitches, not interpretation.

---

### 6.5 Handles Non-Tertian Harmony Naturally

Quartal or cluster chords require no special naming.

Example:

C[0,5,10]

---

### 6.6 Eliminates Enharmonic and Extension Ambiguity

Traditional chord notation sometimes produces cognitive ambiguity when
extensions depend on theoretical spelling rather than actual pitch.

Example:

Fmaj7(9,#11)

The #11 corresponds to B natural.  
However, B is already a white key, and the sharp is only theoretical
(raised fourth degree of F). This can feel confusing in practice.

If written as:

Fmaj7(9,11)

Many musicians will instinctively play:

F A C E G B

instead of the theoretically correct:

F A C E G Bb

The chord symbol relies on interpretation and stylistic expectation.

SVCvN expresses the pitches directly:

F[0,4,7,11,2·,6·]

No enharmonic reasoning or interval reinterpretation is required.
The pitch content is explicit and unambiguous.

---

## 7. Known Limitations

### 7.1 Requires Learning Interval Mapping

Musicians accustomed to scale degrees may need practice to map semitone numbers quickly.

---

### 7.2 Enharmonic Spelling Is Not Represented

Pitch classes do not distinguish F# vs Gb.  
This is a deliberate design tradeoff.

### 7.3 Simple vs complex chords:

For simple chords, traditional notation is shorter:

Traditional:
C

SVCvN:
C[0,4,7]

In these cases, SVCvN is more verbose and provides little immediate benefit.

However, as harmonic complexity increases, traditional notation becomes
longer, less consistent, and sometimes ambiguous, while SVCvN grows
linearly and remains structurally clear.

Example:

Traditional:
Cmaj7(9,#11,13,no5)/E.

SVCvN:
C[·4,0,2,11,6·,9·]


In SVCvN, pitch content is explicit and independent of naming
conventions, making dense or non-tertian chords easier to read,
compare, and process.

---

## 9. Summary

SVCvN represents chords as:

- Root
- Pitch-class vector
- Explicit octave displacement

It trades harmonic naming for structural clarity, making it suitable for:

- Analysis
- Algorithmic composition
- Precise voicing documentation
- Dense or unconventional harmonies
