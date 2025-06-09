
window.onscroll = function () {
    setTimeout(() => {
        $('[data-toggle="tooltip"]').tooltip('hide')
    }, 1000)
    let height = document.getElementById("body").offsetHeight
    // console.log("height",height)
    let stickyHeight = 100

    let youtube = document.getElementById('youTubeWidget')

    if (youtube) {
        youtube?.classList.remove("sticky");
        if (document.body.scrollTop > stickyHeight || document.documentElement.scrollTop > stickyHeight) {
            youtube?.classList.add("sticky");
        }
    }

};

localStorage.removeItem('userpatched')


$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

function rebuildTooltip() {
    $('[data-toggle="tooltip"]').tooltip()
}

PayPal.Donation.Button({
    env: 'production',
    hosted_button_id: 'GLXXKTGLU6BAS',
    image: {
        src: 'https://pics.paypal.com/00/s/MzY2ZTk3MjEtMzM5Yi00ZjBlLWJhMmItYWQ4ODY5OGEzMjRk/file.PNG',
        alt: 'Donate with PayPal button',
        title: 'PayPal - The safer, easier way to pay online!',
    }
}).render('.donate-buttonJS');



document.body.onclick = function (e) {
    setTimeout(() => {
        $('[data-toggle="tooltip"]').tooltip('hide')
    }, 1500)
}