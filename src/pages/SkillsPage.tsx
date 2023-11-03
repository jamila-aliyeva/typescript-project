import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Flex,
  Input,
  Pagination,
  Table,
} from "antd";


import { LIMIT } from "../constants";
import { getSkills, skillName } from "../redux/slice/skills";
import { useAppDispatch } from "../redux/hooks";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";

const SkillsPage = () => {
  const dispatch = useAppDispatch();
  const { skills, loading, total} = useSelector(
    (state: RootState) => state[skillName]
  );

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getSkills({ search, page }));
  }, [dispatch, search, page]);

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
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
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
    }
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
          <Flex  gap={46} align="center">
            <h1>Skills ({total})</h1>
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
        dataSource={skills}
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

export default SkillsPage;
