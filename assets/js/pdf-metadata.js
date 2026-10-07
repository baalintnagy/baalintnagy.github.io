/** Populate PDF properties from the same JSON used to render the CV. */
function applyCVPdfMetadata(pdfDoc, data) {
    const basics = data.basics || {};
    const meta = data.meta || {};
    const title = meta.source?.title || `${basics.name || 'Curriculum Vitae'} CV`;
    const keywords = [...new Set([
        'CV', 'Curriculum Vitae', basics.name, basics.label,
        ...(data.skills?.technical || []).flatMap(group => (group.items || []).map(skill => skill.name)),
        ...(data.skills?.soft || []),
        ...(data.work || []).flatMap(job => [job.position, ...(job.technologies || [])]),
        ...(data.education || []).flatMap(education => [education.area, education.major])
    ].filter(value => typeof value === 'string' && value.trim()))];

    pdfDoc.setTitle(title, { showInWindowTitleBar: true });
    if (basics.name) pdfDoc.setAuthor(basics.name);
    pdfDoc.setSubject([basics.label, ...(data.summary || [])].filter(Boolean).join('\n\n'));
    pdfDoc.setKeywords(keywords);
    pdfDoc.setCreator([title, basics.website].filter(Boolean).join(' — '));
    pdfDoc.setProducer('pdf-lib 1.17.1');
    // Spoken languages are CV content; the document language follows the page.
    pdfDoc.setLanguage(document.documentElement.lang || 'en');
    const generatedAt = new Date();
    pdfDoc.setCreationDate(generatedAt);
    pdfDoc.setModificationDate(generatedAt);

    // Preserve useful JSON fields that have no standard PDF property.
    // Unicode strings keep accented names intact. Encrypted contacts stay out.
    const { PDFName, PDFHexString, PDFDict } = PDFLib;
    const info = pdfDoc.context.lookup(pdfDoc.context.trailerInfo.Info, PDFDict);
    const properties = {
        Website: basics.website,
        Role: basics.label,
        Profiles: (basics.profiles || []).map(profile => `${profile.network}: ${profile.url}`).join('\n'),
        Languages: (data.languages || []).map(language => `${language.language} (${language.fluency})`).join('; '),
        Education: (data.education || []).map(education =>
            [education.institution, education.studyType, education.area, education.department, education.major]
                .filter(Boolean).join(' — ')).join('\n'),
        Employers: [...new Set((data.work || []).map(job => job.company).filter(Boolean))].join('; '),
        SourceType: meta.source?.type
    };
    for (const [key, value] of Object.entries(properties)) {
        if (typeof value === 'string' && value.trim()) {
            info.set(PDFName.of(key), PDFHexString.fromText(value));
        }
    }
}
