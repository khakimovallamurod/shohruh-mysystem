import React, {useMemo, useState} from 'react';
import MainDataTable from "../../../components/ui/dataTable/MainDataTable";
import {useGetAdminReportGrindQuery} from "../../../features/admin/reportGrind/adminResidueApiSlice";
import Section from "../../../components/common/section/Section";
import MainNumberFormat from "../../../components/common/numberFormat/MainNumberFormat";
import validateApiResArray from "../../../util/validateApiResArray";

function AdminReportGrind(props) {
  // State
  const [selectedDate, setSelectedDate] = useState({start: '', end: ''})

  // Api
  const dataRes = useGetAdminReportGrindQuery(selectedDate)

  // Table data
  const tableData = useMemo(() => {
    return validateApiResArray(dataRes)
  }, [dataRes])


  // Columns
  const columns = [
    {
      title: "Id",
      dataIndex: 'id',
      width: 80,
      sortType: 'number',
    },
    {
      title: "Partiya",
      dataIndex: 'partiya',
      width: 80,
      sortType: 'number',
    },
    {
      title: "Massa",
      dataIndex: 'massa',
      width: 80,
      sortType: 'number',
      render: (massa) => <MainNumberFormat value={massa}/>
    },
    {
      title: "Maydalandi",
      dataIndex: 'maydalandi',
      width: 80,
      sortType: 'number',
      render: (maydalandi) => <MainNumberFormat value={maydalandi}/>
    },
    {
      title: "Narxi",
      dataIndex: 'price',
      width: 80,
      sortType: 'number',
      render: (price) => <MainNumberFormat value={price}/>
    },
    {
      title: "Summa",
      dataIndex: 'summa',
      width: 80,
      sortType: 'number',
      render: (summa) => <MainNumberFormat value={summa}/>
    },
    {
      title: "Maydalangan tannarx",
      dataIndex: 'v_summa',
      width: 80,
      sortType: 'number',
      render: (v_summa) => <MainNumberFormat value={v_summa}/>
    },
    {
      title: "Sana",
      dataIndex: 'sana',
      width: 80,
      sortType: 'number',
    },
  ]
  return (
    <Section>
      <MainDataTable
        columns={columns}
        isLoading={dataRes.isLoading || dataRes.isFetching}
        expandableTableCurrent={{
          expandedRowRender: (record) => (
            <div style={{maxWidth:'800px', margin:'auto'}}>
              <MainDataTable
                data={record?.list}
                scroll={{x:400}}
                pagination={false}
                columns={[
                  {
                    title: "Mahsulot nomi",
                    dataIndex: 'product_name',
                    width: 80,
                    sortType: 'string',
                  },
                  {
                    title: "Massa",
                    dataIndex: 'massa',
                    width: 80,
                    sortType: 'number',
                    render: (massa) => <MainNumberFormat value={massa}/>
                  },
                  {
                    title: "Tannarx",
                    dataIndex: 'tannarx',
                    width: 80,
                    sortType: 'number',
                    render: (tannarx) => <MainNumberFormat value={tannarx}/>
                  },
                ]}
                rowClassName={(inRecord) => {
                  if (inRecord?.pnomer?.toLowerCase().includes("v")) {
                    return "row-red";
                  } else if (inRecord?.pnomer?.toLowerCase().includes("qm")) {
                    return "row-yellow";
                  }
                }}
              />
            </div>
          )
        }}
        data={tableData}
        showDatePicker={true}
        setDateValue={setSelectedDate}
        pagination={false}
      />
    </Section>
  );
}

export default AdminReportGrind;