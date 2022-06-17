let form = document.getElementById("github-form")

form.addEventListener("submit",(event)=>{
    const userList= document.querySelector("#user-list")
    userList.innerHTML=""
    const reposList= document.getElementById("repos-list")
    reposList.innerHTML= ""
    event.preventDefault()
    //data we want to pass in the form 
    event.target[0].value
    fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
    .then(response =>response.json())
    .then(response=> {
        //console.log("response", response)
        //login, avatar_url, url
        response.items.forEach(item => {
            const li = document.createElement("li")
            const h2 = document.createElement("h2")
            h2.textContent= item.login

            h2.addEventListener("click", e=> showUserRepos(item.login, e))
            const img = document.createElement("img")
            img.src = item.avatar_url
            const a = document.createElement("a")
            a.href= item.html_url 
            a.innerText= "Profile"

            li.append(h2, img, a)
            userList.append(li)

        })
    })
    form.reset()
    
})

function showUserRepos(username, e){
    const reposList= document.getElementById("repos-list")
    reposList.innerHTML= ""
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response=> response.json())
    .then(response => {response.forEach(repo => {
        const li = document.createElement("li")
        const h1 = document.createElement("h1")
        h1.textContent = repo.name
        li.append(h1)
        reposList.append(li)
    })
    })
}