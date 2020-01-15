export const pathSearch = pathname => {
    return /glasses/i.test(pathname) ? 'Arewayin-Aknots' :
    /contact-lens/i.test(pathname) ? 'Kontaktayin-Ospnyak':
    /eye-lens/i.test(pathname) ? 'Aknotsayin-Shrjanak' : 'Khnamk';
}

export const pathFilter = pathname => {
    return /glasses/i.test(pathname) ? 'glasses' :
    /contact-lens/i.test(pathname) ? 'contact-lens':
    /eye-lens/i.test(pathname) ? 'eye-lens' : 'care';
}
