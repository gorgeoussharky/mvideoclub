document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('[data-url-sm]')
    const isMobile = window.matchMedia('(max-width: 768px)').matches

    links.forEach((link) => {
        const linkEl = link as HTMLLinkElement

        if (isMobile) {
            const smLink = linkEl.dataset.urlSm

            if (smLink) {
                linkEl.href = smLink
            }
        }
    })
})

export {}