


//+ ----  CHECKS ON LOAD ----  +//
window.addEventListener('load', () => {

    //* CHECK DARK MODE *//
    if (localStorage.getItem('isDarkMode') == 'true') {
        toggleDarkMode();
    }

    //* CHECK ACTIVE TAB *// 
    customActiveTab();


    if (window.location.pathname === '/pages/blog.html') {
        loadArticles();
    };

})


//+ ----  ACTIVE TAB FUNCTION ----  +//

function customActiveTab() {

    let navlinks = [...document.querySelectorAll('header a')];

    for (let link of navlinks) {

        if (localStorage.active == link.textContent) {
            link.classList.toggle('active');
        }

        link.onclick = e => {
            localStorage.setItem('active', e.target.textContent);
        };
    }
}



//+ ----  DARK MODE FUNCTION ----  +//

function toggleDarkMode() {

    //* DARK MODE COLORS *//
    document.body.classList.toggle('body-night');
    document.querySelector('header').classList.toggle('header-night');

    //* DARK MODE FAVICON *//
    if (document.querySelector('header img').src.includes('dark')) {
        document.querySelector('header img').src = '/img/pen-logo-white.png';
    }
    else {
        document.querySelector('header img').src = '/img/pen-logo-dark.png';
    }

    //* DARK MODE ICONS *//
    let darkModeIcons = document.querySelectorAll('.dark-mode i');

    for (let icon of darkModeIcons) {
        icon.classList.toggle('none');
    }

}



//+ ----  DARK MODE ON CLICK ----  +//

document.querySelector('.dark-mode').addEventListener('click', (e) => {

    //* STORE DARK MODE STATE *//
    if (localStorage.getItem('isDarkMode') == 'true') {
        localStorage.setItem('isDarkMode', false);
    }
    else {
        localStorage.setItem('isDarkMode', true);
    }

    toggleDarkMode();
})



//+ ----  HEADER BORDER ON SCROLL  ----  +//

window.addEventListener('scroll', () => {

    if (window.scrollY > 0) {
        if ([...document.body.classList].includes('body-night')) {
            document.querySelector('header').style.borderBottom = '1.5px solid #f5f5f5';
        }
        else {
            document.querySelector('header').style.borderBottom = '1.5px solid #252525';
        }
    }
    else {
        document.querySelector('header').style.borderBottom = null;
    }

})



//+ ----  FORM SUBMIT  ----  +//


if (window.location.pathname === '/pages/add.html') {

    document.querySelector('form').addEventListener('submit', (e) => {

        e.preventDefault();

        //* LEVEL ONE

        document.querySelector('.newArticle').innerHTML += `
        <article>
            <h2>${title.value}</h2>
            <img src="${image.value}" alt="${title.value} image">
            <p>${article.value}</p>
            <h3>${author.value}</h3>
        </article>
        `

        //* LEVEL TWO

        let newArticle = {
            title: title.value,
            author: author.value,
            article: article.value,
            pic: image.value
        }

        if (!localStorage.getItem('articles')) {
            let articles = [];
            articles.push(newArticle);
            localStorage.setItem('articles', JSON.stringify(articles));
        }
        else {
            let articles = JSON.parse(localStorage.getItem('articles'));
            articles.push(newArticle);
            localStorage.setItem('articles', JSON.stringify(articles));
        }

        e.target.reset();
    })

}


//+ ----  FUNCTION TO DISPLAY ARTICLES  ----  +//

function loadArticles() {

    if (localStorage.articles) {

        let articles = JSON.parse(localStorage.getItem('articles'));

        articles.map(article => {
            let previousHTML = document.querySelector('.blogs').innerHTML;

            document.querySelector('.blogs').innerHTML = `
                <article>                    
                    <div class="article-head">
                        <h2>${article.title}</h2>
                        <button class="delete" data-article="${article.title}">X</button>
                    </div>
                    <img src="${article.pic}" alt="${article.title} image">
                    <p>${article.article}</p>
                    <h3>${article.author}</h3>
                </article>
                ${previousHTML}
                `;
        })

        //* add function to delete article
        let deleteButtons = document.querySelectorAll('.delete');
        for (let btn of deleteButtons) {
            btn.onclick = function () {

                //* delete from page
                this.closest('article').remove();

                //* delete from storage
                articles = articles.filter(article => article.title !== this.dataset.article);
                localStorage.setItem('articles', JSON.stringify(articles))
            }
        }


    }
}


//+ ----  DISPLAY CURRENT DATE  ----  +//


let currentYear = new Date().getFullYear();

document.getElementById('date').innerHTML = currentYear;