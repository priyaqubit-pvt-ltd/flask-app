
// setting all blogs other than the first 6 to hidden
window.addEventListener("DOMContentLoaded",()=>{
    const blogs = document.querySelectorAll(".blog-outer");
    for(let i=6;i<blogs.length;i++) {
        blogs[i].hidden = true;
    }

    const viewButton = document.querySelector(".blogs-view-all");
    viewButton.addEventListener("click",()=>{
        blogs.forEach((i)=>{
            i.hidden = false;
        });
        viewButton.parentElement.remove();
    });
});