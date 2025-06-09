import React from 'react';
import { useSelector } from 'react-redux';
import { apiUrl } from '../../environment';

const BlogCategory = ({ user, setCatFilter, cat }) => {
        const category = useSelector((state) => state.category);

        return <div className="blog-category-ul">
                {category && category.map(item => {
                        if (item.category == "blog" && item.status == "active") {
                                return <a title={item.id} className={cat == item.id ? 'active' : ''} onClick={() => setCatFilter(item.id)}>
                                        {item.image ? <img src={`${apiUrl}/images/category/${item.image}`} width="20" className='Articlesimg' /> : <i class="fa fa-calendar" aria-hidden="true"></i>}
                                        {/* <i className="fa fa-flag">
                                        </i> */}

                                        {item.name}</a>
                        }
                })}
        </div>

}

export default BlogCategory