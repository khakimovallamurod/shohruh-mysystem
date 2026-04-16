import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import AdminStatisticCard from "../../../components/admin/statistic/AdminStatisticCard";
import Section from "../../../components/common/section/Section";
import ColumnBarChart from "../../../components/common/charts/ColumnBarChart";
import LineChart from "../../../components/common/charts/line/LineChart";
import { useGetAdminBalanceQuery } from "../../../features/admin/statistic/adminStatisticApiSlice";
import { admin_routes } from "../../../util/path";

const quickActions = [
  {
    title: "Ta'minotchi qo'shish",
    description: "Yangi ta'minotchini qo'shish va ro'yxatini ko'rish",
    to: admin_routes.supplierManagement,
  },
  {
    title: "Mijoz qo'shish",
    description: "Yangi mijoz yaratish va qarz holatini ko'rish",
    to: admin_routes.customerManagement,
  },
  {
    title: "Xolodilnikka o'tkazish",
    description: "Mahsulotni xolodilnikka o'tkazish tarixini yuritish",
    to: admin_routes.warehouseTransfer,
  },
  {
    title: "Olingan qarzlar",
    description: "Kirim bo'lgan qarzlarni sana bo'yicha ko'rish",
    to: admin_routes.financeDebts,
  },
  {
    title: "Ta'minotchiga berilgan pullar",
    description: "Ta'minotchilarga qilingan to'lovlar",
    to: admin_routes.supplierManagementPayments,
  },
  {
    title: "Mijozlardan kirim chiqim",
    description: "Mijoz bo'yicha pul aylanishini kuzatish",
    to: admin_routes.customerManagementTransactions,
  },
];

const reports = [
  {
    title: "Barcha ta'minotchilar hisoboti",
    description: "Barcha ta'minotchilar bo'yicha umumiy hisobot",
    to: admin_routes.supplierManagementAllReport,
  },
  {
    title: "Ta'minotchi hisoboti",
    description: "Bitta ta'minotchi bo'yicha to'liq hisobot",
    to: admin_routes.supplierManagementReport,
  },
  {
    title: "Hisobot massa",
    description: "Massa bo'yicha ombor hisoboti",
    to: admin_routes.warehouseMassReport,
  },
  {
    title: "Hisobot mijoz",
    description: "Mijoz kesimidagi hisobot",
    to: admin_routes.customerManagementReport,
  },
  {
    title: "Xarajatlar",
    description: "Xarajatlar tarixini ko'rish va filterlash",
    to: admin_routes.financeExpenses,
  },
  {
    title: "Oylik",
    description: "Ish haqi to'lovlari va oylik hisoboti",
    to: admin_routes.financeSalary,
  },
];

function AdminHomeCard({ title, description, to }) {
  return (
    <Col xs={24} md={12} xl={8}>
      <Card
        bordered={false}
        style={{
          height: "100%",
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
        }}
        bodyStyle={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div>
          <Typography.Title level={5} style={{ marginBottom: 8 }}>
            {title}
          </Typography.Title>
          <Typography.Paragraph
            type="secondary"
            style={{ marginBottom: 0, minHeight: 44 }}
          >
            {description}
          </Typography.Paragraph>
        </div>

        <Link to={to}>
          <Button type="primary" icon={<ArrowRightOutlined />}>
            Ochish
          </Button>
        </Link>
      </Card>
    </Col>
  );
}

function AdminHome() {
  const { data, isLoading } = useGetAdminBalanceQuery();

  const { bank, karta, naqdSum, jamiSum } = useMemo(() => {
    if (data?.success === true && data?.data) {
      const naqdSum = Number(data?.data?.naqdsum || 0);
      const bank = Number(data?.data?.bank || 0);
      const karta = Number(data?.data?.karta || 0);
      return {
        bank,
        karta,
        naqdSum,
        jamiSum: naqdSum + bank + karta,
      };
    }
    return {};
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Section
        style={{
          background:
            "linear-gradient(135deg, rgba(14, 116, 144, 0.12), rgba(22, 163, 74, 0.08))",
          border: "1px solid rgba(14, 116, 144, 0.1)",
        }}
      >
        <Typography.Title level={3} style={{ marginBottom: 8 }}>
          Admin boshqaruv paneli
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          Eng ko'p ishlatiladigan bo'limlar pastda kartalar ko'rinishida chiqarildi.
          Foydalanuvchi kerakli ishni menyudan qidirmasdan bir bosishda ochishi mumkin.
        </Typography.Paragraph>
      </Section>

      <Row gutter={[16, 16]}>
        <AdminStatisticCard
          danger={naqdSum < 0}
          title={"Naqd so'm"}
          value={naqdSum}
          isLoading={isLoading}
        />
        <AdminStatisticCard
          danger={jamiSum < 0}
          title={"Jami so'm"}
          value={jamiSum || 0}
          isLoading={isLoading}
        />
        <AdminStatisticCard
          danger={bank < 0}
          title={"Bank"}
          value={bank || 0}
          isLoading={isLoading}
        />
        <AdminStatisticCard
          danger={karta < 0}
          title={"Karta"}
          value={karta || 0}
          isLoading={isLoading}
        />
      </Row>

      <Section>
        <Typography.Title level={4} style={{ marginBottom: 4 }}>
          Tezkor amallar
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          Kundalik ishlatiladigan asosiy sahifalar.
        </Typography.Paragraph>
        <Row gutter={[16, 16]}>
          {quickActions.map((item) => (
            <AdminHomeCard key={item.to} {...item} />
          ))}
        </Row>
      </Section>

      <Section>
        <Typography.Title level={4} style={{ marginBottom: 4 }}>
          Hisobot va moliya
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          Hisobotlar va moliyaviy nazorat uchun kerakli bo'limlar.
        </Typography.Paragraph>
        <Row gutter={[16, 16]}>
          {reports.map((item) => (
            <AdminHomeCard key={item.to} {...item} />
          ))}
        </Row>
      </Section>

      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <ColumnBarChart />
        <LineChart />
      </div>
    </div>
  );
}

export default AdminHome;
