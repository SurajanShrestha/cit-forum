import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Toast from './components/common/Toast';
import Login from './views/login';
import Register from './views/register';
import Home from './views/home';
import Topic from './views/topic';
import User from './views/user';
import UserAccount from './views/userAccount';
import SearchResults from './views/searchResults';
import CategoryTopics from './views/categoryTopics';
import CreateTopic from './views/createTopic';
import AdminPanel from './views/admin';
import AdminLogin from './views/admin/login';
import AdminAddUser from './views/admin/users/add';
import AdminViewUsers from './views/admin/users/view';
import AdminViewRoles from './views/admin/roles/view';
import AdminViewCategories from './views/admin/categories/view';
import AdminAddCategory from './views/admin/categories/add';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function Error() {
  return <h4 className="text-center">404 Error!!! Page Not Found 😵.</h4>
}

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Toast />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/topic/:slug">
              <Topic />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/user/:slug">
              <User />
            </Route>
            <Route path="/userAccount/:slug">
              <UserAccount />
            </Route>
            <Route path="/searchResults">
              <SearchResults />
            </Route>
            <Route path="/categoryTopics/:slug">
              <CategoryTopics />
            </Route>
            <Route path="/createTopic">
              <CreateTopic />
            </Route>
            <Route path="/admin" exact>
              <AdminPanel />
            </Route>
            <Route path="/admin/login">
              <AdminLogin />
            </Route>
            <Route path="/admin/users/add">
              <AdminAddUser />
            </Route>
            <Route path="/admin/users/view">
              <AdminViewUsers />
            </Route>
            <Route path="/admin/roles/view">
              <AdminViewRoles />
            </Route>
            <Route path="/admin/categories/view">
              <AdminViewCategories />
            </Route>
            <Route path="/admin/categories/add">
              <AdminAddCategory />
            </Route>
            <Route>
              <Error />
            </Route>
          </Switch>
        </div>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
