(async()=>{

    process.env.CONFIG=`.testenv`

    test(`hello!`,()=>{
    
    })
    
    test(`Doomed to fail`,()=>{
        throw new Error(`Opps!`)
    })

})()
