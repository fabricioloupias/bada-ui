import { Content, Layout, Watermark } from "@/components/antd";

export default async function RootPage() {
  return (
    <>
      <Layout>
        <Content
          style={{
            margin: 0,
          }}
        >

          <Watermark content="En diseño" >
            <div style={{ height: '85vh' }} />
          </Watermark>
        </Content>
      </Layout>
    </>
  );
}
