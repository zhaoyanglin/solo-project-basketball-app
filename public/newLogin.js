$(document).ready(function () {

    const switchers = [...document.querySelectorAll('.switcher')]
    console.log(switchers);
    switchers.forEach(item => {
        item.addEventListener('click', function () {
            switchers.forEach(item => item.parentElement.classList.remove('is-active'))
            console.log('-----------------')
            console.log(switchers)
            this.parentElement.classList.add('is-active')
        })
    })
})