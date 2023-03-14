import { Button, Result } from 'antd'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

const Wrapper = styled(Result)`
  margin-top: 100px;
  .ant-result-title {
    color: #fff;
  }
  .ant-result-subtitle {
    color: #fff;
  }
`

const NotFound: React.FC = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  return (
    <Wrapper
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button onClick={goBack} type="primary">Back</Button>}
    />
  )
}

export default NotFound
