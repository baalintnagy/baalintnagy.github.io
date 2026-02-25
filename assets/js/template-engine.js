/**
 * Vanilla JavaScript Template Engine
 * Uses template literals for clean data/presentation separation
 */
class CVTemplateEngine {
    constructor() {
        this.templates = new Map();
        this.registerDefaultTemplates();
    }

    registerTemplate(name, template) {
        this.templates.set(name, template);
    }

    registerDefaultTemplates() {
        // Header template
        this.registerTemplate('header', (data) => `
            <header class="cv-header">
                <div class="profile-section">
                    <img src="${data.basics.image}" alt="${data.basics.name}" class="profile-image">
                    <h1 class="name text-uppercase letter-spacing-lg">${data.basics.name}</h1>
                    <p class="title text-uppercase letter-spacing-md">${data.basics.label}</p>
                </div>
                <div class="contact-section">
                    <div class="contact-info">
                        <i class="bi bi-telephone"></i>
                        <a href="#" id="bfoo" class="contact-item">${data.basics.phone}</a>
                        <i class="bi bi-envelope"></i>
                        <a href="#" id="bbar" class="contact-item">${data.basics.email}</a>
                        <i class="bi bi-globe"></i>
                        <a href="${data.basics.website}" target="_blank" class="contact-item">${data.basics.website}</a>
                    </div>
                    <div class="social-links">
                        ${data.basics.profiles.map(profile => `
                            <a href="${profile.url}" target="_blank" class="social-link" title="${profile.network}">
                                <i class="bi ${this.getSocialIcon(profile.network)}"></i>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </header>
        `);

        // Summary template
        this.registerTemplate('summary', (data) => `
            <section class="cv-section summary-section">
                <h2 class="section-title letter-spacing-sm">
                    <i class="bi bi-person"></i> About Me
                </h2>
                <div class="summary-content">
                    ${data.summary.map(paragraph => `<p class="summary-paragraph">${paragraph}</p>`).join('')}
                </div>
            </section>
        `);

        // Experience template
        this.registerTemplate('experience', (data) => `
            <section class="cv-section experience-section">
                <h2 class="section-title letter-spacing-sm">
                    <i class="bi bi-briefcase"></i> Professional Experience
                </h2>
                <div class="experience-timeline">
                    ${data.work.map(job => this.renderJob(job)).join('')}
                </div>
            </section>
        `);

        // Skills template
        this.registerTemplate('skills', (data) => `
            <section class="cv-section skills-section">
                <h2 class="section-title letter-spacing-sm">
                    <i class="bi bi-gear"></i> Technical Skills
                </h2>
                <div class="skills-content">
                    ${data.skills.technical.map(group => this.renderSkillGroup(group)).join('')}
                </div>
                <div class="soft-skills">
                    <h3>Soft Skills</h3>
                    <div class="soft-skills-tags">
                        ${data.skills.soft.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            </section>
        `);

        // Education template
        this.registerTemplate('education', (data) => `
            <section class="cv-section education-section">
                <h2 class="section-title letter-spacing-sm">
                    <i class="bi bi-book"></i> Education
                </h2>
                <div class="education-content">
                    ${data.education.map(edu => this.renderEducation(edu)).join('')}
                </div>
            </section>
        `);

        // Languages template
        this.registerTemplate('languages', (data) => `
            <section class="cv-section languages-section">
                <h2 class="section-title letter-spacing-sm">
                    <i class="bi bi-translate"></i> Languages
                </h2>
                <div class="languages-content">
                    ${data.languages.map(lang => this.renderLanguage(lang)).join('')}
                </div>
            </section>
        `);
    }

    renderJob(job) {
        const startDate = this.formatDate(job.start);
        const endDate = job.end ? this.formatDate(job.end) : 'Present';
        const period = `${startDate} - ${endDate}`;

        return `
            <div class="job-item">
                <div class="job-header">
                    <div class="job-period">${period}</div>
                    <div class="job-position">${job.position}</div>
                    <div class="job-company">${job.company}${job.project ? ` - ${job.project}` : ''}</div>
                    ${job.vendor ? `<div class="job-vendor">Via ${job.vendor}</div>` : ''}
                </div>
                <div class="job-description">
                    <ul class="job-highlights">
                        ${job.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                    </ul>
                </div>
                <div class="job-technologies">
                    <strong>Technologies:</strong>
                    <div class="tech-tags">
                        ${job.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderSkillGroup(group) {
        return `
            <div class="skill-group">
                <h3 class="skill-group-title">${group.group}</h3>
                <div class="skill-items">
                    ${group.items.map(skill => this.renderSkill(skill)).join('')}
                </div>
            </div>
        `;
    }

    renderSkill(skill) {
        return `
            <div class="skill-item">
                <div class="skill-name" title="${skill.proficiencyPercent}%" aria-label="${skill.proficiencyPercent}%">${skill.name}</div>
                <div class="skill-bar" title="${skill.proficiencyPercent}%" aria-label="${skill.proficiencyPercent}%">
                    <div class="skill-progress" style="width: ${skill.proficiencyPercent}%" title="${skill.proficiencyPercent}%" aria-label="${skill.proficiencyPercent}%"></div>
                </div>
                <div class="print-only skill-level">${skill.proficiencyPercent}%</div>
            </div>
        `;
    }

    renderEducation(edu) {
        return `
            <div class="education-item">
                <div class="education-header">
                    <h3 class="education-institution">
                        <a href="${edu.url}" target="_blank">${edu.institution}</a>
                    </h3>
                    <div class="education-period">${edu.start} - ${edu.end}</div>
                </div>
                <div class="education-details">
                    <div class="education-degree">${edu.studyType} in ${edu.area}</div>
                    <div class="education-major">${edu.department} - Major: ${edu.major}</div>
                </div>
            </div>
        `;
    }

    renderLanguage(lang) {
        const indicator = this.renderLanguageIndicator(lang.indicator);
        return `
            <div class="language-item">
                <div class="language-name">${lang.language} (${lang.fluency})</div>
                <div class="language-indicator">${indicator}</div>
            </div>
        `;
    }

    renderLanguageIndicator(indicator) {
        const full = '■'.repeat(indicator.full);
        const half = '▸'.repeat(indicator.half);
        const empty = '□'.repeat(indicator.empty);
        return `<span class="indicator">${full}${half}${empty}</span>`;
    }

    getSocialIcon(network) {
        const icons = {
            'LinkedIn': 'bi-linkedin',
            'GitHub': 'bi-github',
            'GitLab': 'bi-gitlab',
            'Twitter': 'bi-twitter',
            'Stack Overflow': 'bi-stack-overflow'
        };
        return icons[network] || 'bi-link';
    }

    formatDate(dateString) {
        if (dateString.includes('-')) {
            const [year, month] = dateString.split('-');
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${monthNames[parseInt(month) - 1]} ${year}`;
        }
        return dateString;
    }

    render(data, container) {
        const html = `
            <div class="cv-container">
                ${this.templates.get('header')(data)}
                <div class="cv-content">
                    <div class="main-content">
                        ${this.templates.get('summary')(data)}
                        ${this.templates.get('experience')(data)}
                    </div>
                    <div class="sidebar">
                        ${this.templates.get('skills')(data)}
                        ${this.templates.get('education')(data)}
                        ${this.templates.get('languages')(data)}
                    </div>
                </div>
                <footer class="cv-footer">
                    <div class="footer-content">
                        <a href="${data.extras.footerLink.url}" target="_blank" class="footer-link">
                            ${data.extras.footerLink.label}
                        </a>
                    </div>
                </footer>
            </div>
        `;

        if (container) {
            container.innerHTML = html;
            // Setup decryption handlers after rendering
            this.setupDecryptionHandlers();
        }
        return html;
    }

    setupDecryptionHandlers() {
        const mailUrl = 'https://mail.google.com';
        const p = document.getElementById('bfoo');
        const e = document.getElementById('bbar');

        if (p) {
            p.addEventListener('mouseenter', async function() {
                this.textContent = await dec('QD13Dka9baU0F9BJJTpk5D3IsahwFdTuWV+lmaYHFsU=', mailUrl);
                this.href = await dec('FtgICY666gf2UY5I4ptEbAIMr+CqhwPVMbMNXP4YZsY=', mailUrl);
            });
            p.addEventListener('focus', async function() {
                this.textContent = await dec('QD13Dka9baU0F9BJJTpk5D3IsahwFdTuWV+lmaYHFsU=', mailUrl);
                this.href = await dec('FtgICY666gf2UY5I4ptEbAIMr+CqhwPVMbMNXP4YZsY=', mailUrl);
            });
        }

        if (e) {
            e.addEventListener('mouseenter', async function() {
                this.textContent = await dec('fvhQzPSCkLLLh8LdE8Vupa0bpqMFuRDKQO11s8oThWc=', mailUrl);
                this.href = await dec('//wO3oyArSSKk6+PEb8mN3db2Xud5hPT1t+52XFW4AY=', mailUrl);
            });
            e.addEventListener('focus', async function() {
                this.textContent = await dec('fvhQzPSCkLLLh8LdE8Vupa0bpqMFuRDKQO11s8oThWc=', mailUrl);
                this.href = await dec('//wO3oyArSSKk6+PEb8mN3db2Xud5hPT1t+52XFW4AY=', mailUrl);
            });
        }
    }
}

// Export for use
window.CVTemplateEngine = CVTemplateEngine;
