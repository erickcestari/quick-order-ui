import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts';
import langPTbr from 'echarts/i18n/langPT-br-obj';
import { Api } from '@web/domain';
import { Order } from '@web/domain/order';
import { statusOrderColorMap } from '@web/view/orderColorMap';
import { Product } from '@web/domain/product';

echarts.registerLocale('pt-BR', langPTbr)



const ProductsMadePieChart = () => {
  const chartRef = useRef(null);
  const echartRef = useRef<null | echarts.ECharts>(null);

  const [productData, setProductData] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await Api.Product.findMany({ includes: ["orderProducts"] })
      setProductData(products.filter(product => product.orderProducts.length > 0))
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const myChart = echarts.init(chartRef.current, null, { locale: 'pt-BR' })

    myChart.showLoading({text: 'Carregando...'})

    echartRef.current = myChart;

    return () => {
      myChart.dispose();
    }
  }, []);

  useEffect(() => {
    if (productData.length == 0) return;

    const option: echarts.EChartsOption = {
      toolbox: {
        right: 10,
        feature: {
          saveAsImage: {}
        }
      },
      tooltip: {
        trigger: 'item'
      },
      title: {
        text: 'Produtos mais Produzidos do Mês',
        left: '1px'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Produtos mais Produzidos do Mês',
          type: 'pie',
          roseType: 'radius',
          radius: ['20%', '80%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderWidth: 2,
            borderColor: '#fff'
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            itemStyle: {
              borderWidth: 0,
              borderColor: 'transparent'
            },
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
              edgeDistance: 100,
            },
          },
          labelLine: {
            show: false
          },
          data: productData.sort((a,b) => a.orderProducts.length > b.orderProducts.length ? -1 : 1).map((product, index) => {
            return {
              value: product.orderProducts.length,
              name: product.name,
              itemStyle: {
                color: Array.from(statusOrderColorMap.values())[index % statusOrderColorMap.size]
              }
            }
          })
        }
      ]
    };

    echartRef.current.setOption(option)
    echartRef.current.hideLoading()
  }, [productData]);

  return (<div ref={chartRef} style={{ height: '600px', width: '100%' }} />)
};

export default ProductsMadePieChart;