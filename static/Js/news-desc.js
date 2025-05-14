
// adjusting the height of contact-banner image to ensure that it covers its contents
window.addEventListener("DOMContentLoaded",adjustContactBannerImage);
window.addEventListener("resize",adjustContactBannerImage);

function adjustContactBannerImage() {
    const reqHeight = (document.querySelector(".contact-btn")).getBoundingClientRect().bottom - (document.querySelector(".contact-banner-content > h3")).getBoundingClientRect().top;
    const backgroundImage = document.querySelector(".contact-banner > img");
    if(window.getComputedStyle(backgroundImage).height >= reqHeight) {
        return;
    } else {
        if(window.innerWidth <= 820) {
            backgroundImage.style.height = reqHeight + 80 + "px";
        } else {
            backgroundImage.style.height = reqHeight + 160 + "px";
        }
    }
}