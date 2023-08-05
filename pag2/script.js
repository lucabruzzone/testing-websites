

window.addEventListener('scroll', function(){
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active', window.scrollY > 0)  
})