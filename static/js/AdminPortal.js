

const listed = document.getElementById('listed')
const unlisted = document.getElementById('unlisted')


function showListed(){
    listed.style.display = 'inline-block'
    unlisted.style.display='none'
}

function showUnlisted(){
    unlisted.style.display = 'inline-block'
    listed.style.display='none'
}

