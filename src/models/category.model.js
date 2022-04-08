const list=[
    {name:'Blogs',id:'blog'},
    {name:'Journey',id:'project'}
]

const find=(id)=>{
    return list.find(itm=>itm.id==id).name
}

const categoryModel={list,find}
export default categoryModel