import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Parallax from 'parallax-js'

gsap.registerPlugin(ScrollTrigger)

const isMobile = window.matchMedia('(max-width: 768px)').matches

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initParallax = () => {
    const parallaxScenes = document.querySelectorAll('[data-parallax]')

    parallaxScenes.forEach((scene) => {

        const animatedLayers = scene.querySelectorAll('[data-animate]')

        animatedLayers.forEach((image) => {
            (image as HTMLElement).style.height = `${(image as HTMLElement).offsetHeight}px`;
            (image as HTMLElement).style.width = `${(image as HTMLElement).offsetWidth}px`
        })

        setTimeout(() => {
            new Parallax(scene as HTMLElement, {
                selector: '[data-layer]',
                relativeInput: true
            })
        }, 400)
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

    const leaveFade = () => {
        gsap.to(heroImages, {
            x: '20vw',
            opacity: 0,
            duration: 1,
            ease: 'back.out(2)',
        })

        gsap.to(fadesLeft, {
            x: '20vw',
            opacity: 0,
            duration: 1,
            ease: 'back.out(1)',
        })

        gsap.to(fadesRight, {
            x: '-20vw',
            opacity: 0,
            duration: 1,
            ease: 'back.out(1)',
        })
    }

    const enterBackFade = () => {
        gsap.to(heroImages, {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: i => 0.25 * i,
            ease: 'back.out(2)',
        })

        gsap.to(fadesLeft, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'back.out(1)',
        })

        gsap.to(fadesRight, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'back.out(1)',
        })
    }

    ScrollTrigger.create({
        trigger: hero,
        start: 'top 30%',
        end: '60% top',
        onEnter: enterFade,
        onLeave: leaveFade,
        onEnterBack: enterBackFade,
    })
}

const initCashbackAnimations = () => {
    const cashback = document.querySelector('.cashback')

    if (!cashback) return

    const circle = cashback.querySelector('.cashback__wrap')
    const circleWrap = cashback.querySelector('.cashback__circle')
    const cirlceContent = cashback.querySelector('.cashback__circle-content')
    const images = cashback.querySelectorAll('[data-animate]')

    gsap.set(circle, {
        opacity: 0,
        // scale: 4,
    })

    let isAnimating = false

    const enterAnims = () => {
        if (isAnimating) return
        if (!circle || !cirlceContent) return

        const tl = gsap.timeline()

        isAnimating = true

        // tl.to(circle, {
        //     scale: 1,
        //     opacity: 1,
        //     duration: 0.75,
        //     ease: 'power1.in',
        // })

        tl.to(circle, {
            scale: 0.6,
            opacity: 1,
            duration: 0.35,
            ease: 'power1.in',
        })

        tl.to(circle, {
            scale: 1,
            duration: 0.75,
            ease: 'power1.out',
        })

        tl.from(cirlceContent, {
            opacity: 0,
            scale: 0,
        })

        tl.from(images, {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
            scale: 0,
            duration: isMobile ? 0.35 : 0.5,
            ease: 'power1.out',
            delay: i => isMobile ? 0.1 * i : 0.2 * i,
        })
  
        tl.call(() => {
            circleWrap?.classList.add('cashback__circle--layers')
            isAnimating = false
        })
    }

    const leaveAnims = () => {
        if (isAnimating) return

        if (!circle || !cirlceContent) return

        circleWrap?.classList.remove('cashback__circle--layers')
        
        gsap.to(circle, {
            scale: 0,
            opacity: 0,
            duration: 0.35,
            ease: 'power1.out',
        })
    }

    ScrollTrigger.create({
        trigger: cashback,
        start: 'top center',
        end: '70% top',
        onEnter: enterAnims,
        onLeave: leaveAnims,
        onEnterBack: enterAnims,
        onLeaveBack: leaveAnims,
        fastScrollEnd: 1000,
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

    const enterFade = () => {
        gsap.to(fadesRight, {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: i => i * 0.25,
            ease: 'back.out(1)',
        })
    }

    const leaveFade = () => {
        gsap.to(fadesRight, {
            x: '-20vw',
            opacity: 0,
            duration: 1,
            delay: i => i * 0.25,
            ease: 'back.out(1)',
        })
    }

    const enterBackFade = () => {
        gsap.to(fadesRight, {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: i => i * 0.25,
            ease: 'back.out(1)',
        })
    }

    ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: '70% top',
        onEnter: enterFade,
        onLeave: leaveFade,
        onEnterBack: enterBackFade,
        onLeaveBack: leaveFade,
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

    const enterFade = () => {
        gsap.to(fadesRight, {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: i => i * 0.25,
            ease: 'back.out(1)',
        })
    }

    const leaveFade = () => {
        gsap.to(fadesRight, {
            x: '-20vw',
            opacity: 0,
            duration: 1,
            delay: i => i * 0.25,
            ease: 'back.out(1)',
        })
    }

    const enterBackFade = () => {
        gsap.to(fadesRight, {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: i => i * 0.25,
            ease: 'back.out(1)',
        })
    }

    ScrollTrigger.create({
        trigger: section,
        start: '30% bottom',
        end: 'bottom top',
        onEnter: enterFade,
        onLeave: leaveFade,
        onEnterBack: enterBackFade,
        onLeaveBack: leaveFade,
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
                top: isMobile? 0 : 100,
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

    const leaveBackFade = () => {
        gsap.to(fadesRight, {
            x: '-20vw',
            opacity: 0,
            duration: 1,
            delay: i => i * 0.25,
            ease: 'back.out(1)',
        })

        if (phoneWrap) {
            gsap.to(phoneWrap, {
                top: '100vh',
                duration: 2,
                opacity: 0,
                ease: 'back.out(1)',
            })
        }

        if (bonusCard) {
            gsap.to(bonusCard, {
                scale: 0.765,
                ease: 'back.out(1)',
            })
        }
    }

    ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: '40% top',
        onEnter: enterFade,
        onLeaveBack: leaveBackFade,
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
