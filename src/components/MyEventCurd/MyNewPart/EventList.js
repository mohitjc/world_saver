import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { Toast } from "reactstrap";
import ApiClient from "../../apiClient";
import Layout from "../../global/Layout";
import MainSidebar from "../../global/MainSidebar";
import SectionHeader from "../../global/SectionHeader";
import Loading from "../../global/Loader";
import swal from "sweetalert";
export default function NewEventList() {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getdata();
  }, []);


  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const getdata = () => {
    ApiClient.get(`/events?page=1&count=10&search=`)
      .then((res) => {
        setdata(res.data.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  const [editdata, seteditdata] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  // For Updating the Event by the api
  const HandleEidt = (id) => {
    history.push(`/events/${id}`);
  };
  const HandleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function(isConfirm) {
      if (isConfirm) { 
          ApiClient.delete(`/delete/event?id=${id}`)
          .then((res) => getdata())
          .catch((err) => alert("Error"));
 
      } else {
        swal("Cancelled", "Your  Data is safe :)", "error");
      }
    })

  };

  return (
    <div>
      <Layout title="Events">
        <MainSidebar />
        <div className="main-content">
          <section className="section">
            <SectionHeader title="Events List" />

            <button className="btn btn-primary my-2">
              <NavLink to="/events">
                <span className="text-white">Add Event</span>
              </NavLink>
            </button>

            {loading == true ? (
              <Loading />
            ) : (
              <div className="table-responsive">
              <table className="table ">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Url</th>
                   
                    <th>StartDate</th>
                    <th>EndDate</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index, array) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.description.substr(0,10)}</td>
                      <td>{item.url}</td>
                   
                      <td>  {' '}
                        {months[
                          new Date(item && item.startDate).getMonth()
                        ] +
                        ' ' +
                        new Date(item && item.startDate).getDate() +
                          ', ' +
                          new Date(item && item.startDate ).getFullYear()}</td>
                      <td>
                      {' '}
                        {months[
                          new Date(item && item.endDate).getMonth()
                        ] +
                        ' ' +
                        new Date(item && item.endDate).getDate() +
                          ', ' +
                          new Date(item && item.endDate).getFullYear()}
                          </td>
                    
                      <td>
                        <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="btn btn-icon btn-primary mr-2 my-2"
                          onClick={() => HandleEidt(item.id)}
                          disabled={!!(item && item.type === "custom")}
                        >
                          <i className="far fa-edit" />
                        </button>
                        <button
                          onClick={() => HandleDelete(item.id)}
                          type="button"
                          className="btn btn-icon btn-danger "
                          disabled={!!(item && item.type === "custom")}
                        >
                          <i className="fas fa-trash" />
                        </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}
          </section>
        </div>
      </Layout>
    </div>
  );
}
