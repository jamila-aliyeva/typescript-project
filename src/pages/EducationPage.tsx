import { Fragment, useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import {
  Flex,
  Input,
  Pagination,
  Table,
} from "antd";


import { LIMIT } from "../constants";
import { educationName, getEducations } from "../redux/slice/education";
import { useAppDispatch } from "../redux/hooks";
import { Link } from "react-router-dom";

const Education = () => {
  const dispatch = useAppDispatch();
  const { education, loading, total } = useSelector(
    (state) => state[educationName]
  );

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getEducations({ search, page }));
  }, [dispatch, search, page]);

  

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "percent",
    },
  ];
  return (
    <Fragment>
      <div className="container">
      <Flex style={{justifyContent: "space-between", paddingBlock: '20px'}}>
      <Link to="/skills">Skills</Link>
        <Link to="/education">Education</Link>
      </Flex>
      <Table
      className="table"
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex justify="space-between" gap={36} align="center">
            <h1>Educations ({total})</h1>
            <Input
              value={search}
              onChange={handleSearch}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
          </Flex>
        )}
        pagination={false}
        loading={loading}
        dataSource={education}
        columns={columns}
      />
      {total > LIMIT ? (
        <Pagination
        className="pagination"
          total={total}
          pageSize={LIMIT}
          current={page}
          onChange={(page) => setPage(page)}
        />
      ) : null}
      </div>
    </Fragment>
  );
};

export default Education;
