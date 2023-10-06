const list=[
    {name:'Blogs',id:'blog'},
    {name:'Journey',id:'project'},
    {name:'Events',id:'event'}
]

const find=(id)=>{
    return list.find(itm=>itm.id==id).name
}
export const eventModel = {
    title:'',
    description:'',
    category_id:'',
    journey:'',
    images:[],
    featuredImage:'',
    startDate:'',
    endDate:'',
    groupName:'',
    address:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    lat:'',
    lng:'',
    cost:'',
    sizeOfVenue:'',
    location:{},
    eventType:'',
    tags:[]

}
const categoryModel={list,find}
export default categoryModel
