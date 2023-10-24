import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Parallax from 'parallax-js'

gsap.registerPlugin(ScrollTrigger)

const isMobile = window.matchMedia('(max-width: 991px)').matches

const initParallax = () => {
    const parallaxScenes = document.querySelectorAll('[data-parallax]')

    parallaxScenes.forEach((scene) => {
        new Parallax(scene as HTMLElement, {
            selector: '[data-layer]',
            relativeInput: true,
        })
    })
}

const initHeroAnimations = () => {
    const hero = document.querySelector('.hero')

    if (!hero) return

    const heroImages = hero.querySelectorAll('[data-animate]')
    const fadesLeft = hero.querySelectorAll('[data-fade-left]')
    const fadesRight = hero.querySelectorAll('[data-fade-right]')

    const enterFade = () => {
        gsap.from(fadesLeft, {
            x: '20vw',
            opacity: 0,
            duration: 1,
            ease: 'back.out(1)',
        })

        gsap.from(fadesRight, {
            x: '-20vw',
            opacity: 0,
            duration: 1,
            ease: 'back.out(1)',
        })

        gsap.from(heroImages, {
            x: '20vw',
            opacity: 0,
            duration: 1,
            delay: i => 0.25 * (i + 1),
            ease: 'back.out(2)',
        })
    }

    ScrollTrigger.create({
        trigger: hero,
        start: 'top 30%',
        end: '60% top',
        onEnter: enterFade,
    })
}

const initCashbackAnimations = () => {
    const cashback = document.querySelector('.cashback')

    if (!cashback) return

    const circle = cashback.querySelector('.cashback__wrap')
    const circleWrap = cashback.querySelector('.cashback__circle')
    const cirlceContent = cashback.querySelector('.cashback__circle-content')
    const images = cashback.querySelectorAll('[data-animate]')

    gsap.set(images, {
        opacity: 0,
    })

    let isAnimating = false

    const enterAnims = () => {
        if (isAnimating) return
        if (!circle || !cirlceContent) return

        const tl = gsap.timeline()

        tl.to(images, {
            duration: 0,
            opacity: 1,
        })

        isAnimating = true

        tl.call(() => {
            circleWrap?.classList.add('cashback__circle--layers')
            isAnimating = false
        })

        tl.from(images, {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
            scale: 0,
            duration: isMobile ? 0.35 : 0.5,
            ease: 'back.out(2)',
            delay: i => (isMobile ? 0.1 * i : 0.2 * i),
        })
    }

    ScrollTrigger.create({
        trigger: cashback,
        start: isMobile ? '5% 50%' : '5% 50%',
        onEnter: enterAnims,
        once: true,
    })
}

const initCategoriesAnimations = () => {
    const section = document.querySelector('.cashback-categories')

    if (!section) return

    const fadesRight = section.querySelectorAll('[data-fade-right]')

    gsap.set(fadesRight, {
        opacity: 0,
        x: '-20vw',
    })

    fadesRight.forEach((el) => {
        const enterFade = () => {
            gsap.to(el, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'back.out(1)',
            })
        }

        ScrollTrigger.create({
            trigger: el,
            start: isMobile ? '10% bottom' : '15% bottom',
            end: 'bottom top',
            onEnter: enterFade,
        })
    })
}

const initConditionsAnimations = () => {
    const section = document.querySelector('.cashback-conditions')

    if (!section) return

    const fadesRight = section.querySelectorAll('[data-fade-right]')

    gsap.set(fadesRight, {
        opacity: 0,
        x: '-20vw',
    })

    fadesRight.forEach((el) => {
        const enterFade = () => {
            gsap.to(el, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'back.out(1)',
            })
        }

        ScrollTrigger.create({
            trigger: el,
            start: isMobile ? '10% bottom' : '15% bottom',
            end: 'bottom top',
            onEnter: enterFade,
        })
    })
}

const initAppsAnimations = () => {
    const section = document.querySelector('.mobile-apps')

    if (!section) return

    const fadesRight = section.querySelectorAll('[data-fade-right]')

    const phoneWrap = section.querySelector('.mobile-apps__phone-wrap')
    const bonusCard = section.querySelector('.mobile-apps__bonus-card')

    gsap.set(fadesRight, {
        opacity: 0,
        x: '-20vw',
    })

    gsap.set(phoneWrap, {
        top: '100vh',
        opacity: 0,
    })

    const enterFade = () => {
        const tl = gsap.timeline()

        tl.to(fadesRight, {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: i => i * 0.25,
            ease: 'back.out(1)',
        })

        if (phoneWrap) {
            tl.to(phoneWrap, {
                top: isMobile ? 0 : 100,
                duration: 1,
                opacity: 1,
                ease: 'back.out(1)',
            })
        }

        if (bonusCard) {
            tl.to(bonusCard, {
                scale: 1,
                ease: 'back.out(1)',
            })
        }
    }

    ScrollTrigger.create({
        trigger: section,
        start: isMobile ? '10% bottom' : '30% bottom',
        onEnter: enterFade,
    })
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations()
    initCashbackAnimations()
    initCategoriesAnimations()
    initConditionsAnimations()
    initAppsAnimations()

    setTimeout(() => {
        !isMobile && initParallax()
    }, 100)
})

export {}
