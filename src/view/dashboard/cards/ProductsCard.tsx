import { useEffect, useState } from 'react'
import DashboardCard from './DashboardCard'
import {
  ProductOutlined
} from '@ant-design/icons'
import { Api } from '@web/domain'
import { ColProps } from 'antd'

const ProductsCard = (props: ColProps) => {
  const [productsData, setProductsData] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await Api.Product.findMany()
      setProductsData(products.length)
    }

    fetchProducts()
  }, [])

  return (
    <DashboardCard href='/products' icon={<ProductOutlined />} title='Produtos' value={productsData} {...props}/>
  )
}

export default ProductsCard