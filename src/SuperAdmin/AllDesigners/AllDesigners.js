import React, { useEffect, useState } from "react";
import SearchInput from "../../Common/SearchInput";
import { connect, useDispatch } from "react-redux";
import { get_all_users } from "../../reduxdata/rootAction";
import AllDesignerList from "./AllDesignerList";

const AllDesigners = ({ user, users, inactiveUsers, total, inactiveTotal }) => {
  const dispatch = useDispatch();
  const role = 'designer';
  const [search, setSearch] = useState(null)
  useEffect(() => {
    get_all_users(dispatch, user?.token, role, 1, 10, search, true);
    get_all_users(dispatch, user?.token, role, 1, 10, search, false);
  }, [search]);
  return (
    <>
      <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper admin-payments px-60 py-md-2 py-lg-3">
          <h3 className="fw-bold mb-3">Designers</h3>
          <SearchInput placeholder="Browse Designers..." handleSearch={(val) => setSearch(val)} />
          <div className="mt-5 review-main-content">
            <AllDesignerList active user={user} users={users} total={total} search={search} />
            <AllDesignerList user={user} users={inactiveUsers} total={inactiveTotal} search={search} />
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    users: state.member.users,
    inactiveUsers: state.member.inactiveUsers,
    total: state.member.total,
    inactiveTotal: state.member.inactiveTotal
  };
};
export default connect(mapStateToProps)(AllDesigners);