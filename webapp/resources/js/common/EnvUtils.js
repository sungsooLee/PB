const EnvUtils = {
    profile : '',

    /**
     * OS 이름 반환
     */
    getOs : () => {
        if ( EnvUtils.isIOS()) return 'iOS';
        if ( EnvUtils.isAOS()) return 'AOS';
        return 'PC';
    },

    /**
     * iOS 여부 확인
     */
    isIOS : () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const platform = navigator.platform.toLowerCase();
        console.log('platform : ', navigator.platform.toLowerCase());
        console.log('isIOS : ', userAgent);
        return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && platform !== 'win32';
    },

    /**
     * AOS 여부 확인
     */
    isAOS : () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const platform = navigator.platform.toLowerCase();
        console.log('platform : ', navigator.platform.toLowerCase());
        console.log('isAOS : ', userAgent);
        return ( /Android/.test(userAgent) || /Tablet/.test(userAgent)) && platform !== 'win32';
    },

    /**
     * 모바일 기기 여부
     * @returns {boolean}
     */
    isMobile : () => {

        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        let isMobile = true;

        if ( EnvUtils.isIOS()) {
            isMobile = /iPhone|iPod/.test(userAgent);
        } else {
            isMobile = (/Android/.test(userAgent));
        }

        return isMobile;
    },

    /**
     * 태블릿 기기 여부
     * @returns {boolean}
     */
    isTablet : () => {
        return !EnvUtils.isMobile();
    },

    isLocal : () => {
        return EnvUtils.profile === 'local';
    },

    isDev : () => {
        return EnvUtils.profile === 'dev';
    },

    isPrd : () => {
        return EnvUtils.profile === 'prd';
    },

    getEnv : () => {
        return EnvUtils.profile;
    },

    setEnv : () => {
        EnvUtils.profile = (window.APP_ENV) ? window.APP_ENV.profile : 'dev';
    }

}