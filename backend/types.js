const zod = require('zod');


const createTodo = zod.object({
    title : zod.string(),
    description : zod.string()

})

const updateTodo = zod.object({
    _id : zod.string()
})

module.exports = {
    createTodo,
    updateTodo
}





// {
//     title : String
//     description : String
// }

// {
//     id : string
// }