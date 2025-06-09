/*********** Routes for applications **************/
import React, { lazy } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import AppRoute from './AppRoute';
import { Auth } from '../auth';
import { publicLayout, privateLayout } from '../components/Layouts';
import { socketConnection } from '../utilities/socket';

const TabsProvider = lazy(() => import(`../components/provider/Porvider`));
const YoutubePlayer = lazy(() => import(`../components/YoutubePlayer`));

const Routers = (store) => {
  socketConnection.on('receive-message', (data) => {
    //console.log("socketConnection aapp", data)
    let element = document.getElementById('ChatNotification');
    if (element) element.click();
    let el2 = document.getElementById('getFriendListJs');
    if (el2) el2.click();
  });

  const routes = [
    { url: "/",component:lazy(() => import(`../containers/login`)), layout: publicLayout },
    { url: "/signup", component:lazy(() => import(`../containers/login`)), layout: publicLayout },
    { url: "/signin",component:lazy(() => import(`../containers/login`)), layout: publicLayout },
    { url: "/blogdetail/:id",component:lazy(() => import(`../containers/blogs/blogdetail`)), layout: publicLayout },
    { url: "/bloglisting",component:lazy(() => import(`../containers/blogs`)), layout: publicLayout },
    { url: "/bloglisting/:cat_id",component:lazy(() => import(`../containers/blogs`)), layout: publicLayout },
    { url: "/memberedit", component:lazy(() => import(`../containers/member/memberEdit`)), layout: privateLayout },
    { url: "/memberlisting",component:lazy(() => import(`../containers/member/memberListing`)), layout: privateLayout },
    { url: "/membermedia/:userId/:type",component:lazy(() => import(`../containers/member/memberMediaPage`)), layout: privateLayout },
    { url: "/journeyList",component:lazy(() => import(`../containers/project/projectListing`)), layout: privateLayout },
    { url: "/myjourney",component:lazy(() => import(`../containers/project/MyJorney`)), layout: privateLayout },
    { url: "/myjourney/:id",component:lazy(() => import(`../containers/project/JourneyEdit`)), layout: privateLayout },
    { url: "/profile",component:lazy(() => import(`../containers/profileUpdate`)), layout: privateLayout },
    { url: "/showarchives",component:lazy(() => import(`../containers/youtube`)), layout: privateLayout },
    { url: "/journey/:id",component:lazy(() => import(`../containers/project/projectDetail`)), layout: privateLayout },
    { url: "/journey/:id/:postId",component:lazy(() => import(`../containers/project/projectDetail`)), layout: privateLayout },
    { url: "/mybooking/:id",component:lazy(() => import(`../containers/Events/Booking`)), layout: privateLayout },
    { url: "/acceptInvitaion/:inviteCode",component:lazy(() => import(`../containers/project/acceptInvite`)), layout: privateLayout },
    { url: "/declineInvitaion/:inviteCode",component:lazy(() => import(`../containers/project/declineInvite`)), layout: privateLayout },
    { url: "/dashboard",component:lazy(() => import(`../containers/dashboard`)), layout: privateLayout },
    { url: "/events",component:lazy(() => import(`../containers/Events/event`)), layout: privateLayout },
    { url: "/addevent",component:lazy(() => import(`../containers/Events/AddEditEvent`)), layout: privateLayout },
    { url: "/editevent/:id",component:lazy(() => import(`../containers/Events/AddEditEvent`)), layout: privateLayout },
    { url: "/event/:title",component:lazy(() => import(`../containers/Events/EventReview`)), layout: privateLayout },
    { url: "/notifications",component:lazy(() => import(`../containers/ProjectNotifications`)), layout: privateLayout },
    { url: "/deleteaccount",component:lazy(() => import(`../containers/deleteaccount`)), layout: privateLayout },
    { url: "/terms",component:lazy(() => import(`../containers/Terms`)), layout: publicLayout },
    { url: "/about", component:lazy(() => import(`../containers/About`)), layout: publicLayout },
    { url: "/privacy",component:lazy(() => import(`../containers/Privacy`)), layout: publicLayout },
    { url: "/blockeduser",component:lazy(() => import(`../containers/BlockedUser`)), layout: publicLayout },
    { url: "/worldsavers",component:lazy(() => import(`../containers/WorldSavers`)), layout: privateLayout },
    { url: "/post/:id",component:lazy(() => import(`../containers/ViewPost`)), layout: privateLayout },
    { url: "/:id/:mode?",component:lazy(() => import(`../containers/member/memberDetail`)), layout: privateLayout },
  ]

  return (
    <TabsProvider>
      <Router>
        <Routes>
          {routes.map((itm) => {
            const Element = itm.component;
            return (
              <Route
                path={itm.url}
                element={
                  <AppRoute
                    Component={Element}
                    requireAuth={Auth}
                    layout={itm.layout}
                    store={store}
                    type="public"
                  />
                }
              />
            );
          })}
        </Routes>
      </Router>

      <YoutubePlayer />
    </TabsProvider>
  );
};

export default Routers;
