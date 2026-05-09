const container = document.getElementById('article')
const loading = document.getElementById('loading')
const error = document.getElementById('error')
const empty = document.getElementById('empty')
const searchInput = document.getElementById('search')

let allPosts = []

async function fetchPosts() {
    loading.style.display = 'block'
    container.innerHTML = ''
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        loading.style.display = 'none'
        allPosts = data
        displayPosts(data)
    } catch (err) {
        loading.style.display = 'none'
        error.style.display = 'block'
    }
}

function displayPosts(posts) {
    container.innerHTML = ''
    
    if (posts.length === 0) {
        empty.style.display = 'block'
        return
    }
    
    empty.style.display = 'none'
    posts.forEach(post => {
        const box = document.createElement('div')
        box.classList.add('box')
        box.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `
        container.appendChild(box)
    })
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase()
    const filtered = allPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm)
    )
    displayPosts(filtered)
})

fetchPosts()