import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts';
import langPTbr from 'echarts/i18n/langPT-br-obj';
import { Api } from '@web/domain';
import { Order } from '@web/domain/order';
import { statusOrderColorMap } from '@web/view/orderColorMap';

echarts.registerLocale('pt-BR', langPTbr)



const OrdersBarChart = () => {
  const chartRef = useRef(null);
  const echartRef = useRef<null | echarts.ECharts>(null);

  const [ordersData, setOrdersData] = useState<Order[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await Api.Order.findMany()
      setOrdersData(orders.sort((a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()))
    }

    fetchOrders()
  }, [])

  useEffect(() => {
    const myChart = echarts.init(chartRef.current, null,  {locale: 'pt-BR'})

    myChart.showLoading({text: 'Carregando...'})

    echartRef.current = myChart;

    return () => {
      myChart.dispose();
    }
  }, []);

  useEffect(() => {
    if (ordersData.length == 0) return;

    const canceledOrders = ordersData.filter(order => order.status === "Cancelado")
    const completedOrders = ordersData.filter(order => order.status === "Concluído")
    const inProgressOrders = ordersData.filter(order => order.status === "Em Progresso")
    const pendingOrders = ordersData.filter(order => order.status === "Pendente")
    const shippedOrders = ordersData.filter(order => order.status === "Enviado")

    const monthNames = ordersData
      .map(order => new Date(order.dateCreated).toLocaleString('pt-BR', { month: 'long' }))
      .filter((value, index, self) => self.indexOf(value) === index);

    const option: echarts.EChartsOption = {
      legend: {
        top: '5%',
        left: 'center'
      },
      title: {
        text: 'Ordens de Produção por Mês',
        left: '1%'
      },
      media: [
        {
          query: {
            maxWidth: 500
          },
          option: {
            toolbox: {show: false },
            title: {
              text: 'Ordens de Produção por Mês',
              left: 'center'
            },
            legend: {
              top: '32px',
              
            },
            grid: {
              top: '96px'
            }
          },

        }
      ],
      toolbox: {
        right: 10,
        feature: {
          magicType: { type: ['line', 'bar'] },
          saveAsImage: {}
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ordersData
          .map(order => new Date(order.dateCreated).toLocaleString('pt-BR', { month: 'long' }))
          .filter((value, index, self) => self.indexOf(value) === index),
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Concluído',
          type: 'bar',
          stack: 'orders',
          emphasis: {
            focus: 'series'
          },
          color: statusOrderColorMap.get('Concluído'),
          data: completedOrders.reduce((acc, order) => {
            const orderMonthName = new Date(order.dateCreated).toLocaleString('pt-BR', { month: 'long' });
            const month = monthNames.indexOf(orderMonthName);
            if (!acc[month]) {
              acc[month] = 0;
            }
            acc[month]++;
            return acc;
          }, [])
        },
        {
          name: 'Em Progresso',
          type: 'bar',
          stack: 'orders',
          emphasis: {
            focus: 'series'
          },
          color: statusOrderColorMap.get('Em Progresso'),
          data: inProgressOrders.reduce((acc, order) => {
            const orderMonthName = new Date(order.dateCreated).toLocaleString('pt-BR', { month: 'long' });
            const month = monthNames.indexOf(orderMonthName);
            if (!acc[month]) {
              acc[month] = 0;
            }
            acc[month]++;
            return acc;
          }, [])
        },
        {
          name: 'Enviado',
          type: 'bar',
          stack: 'orders',
          emphasis: {
            focus: 'series'
          },
          color: statusOrderColorMap.get('Enviado'),
          data: shippedOrders.reduce((acc, order) => {
            const orderMonthName = new Date(order.dateCreated).toLocaleString('pt-BR', { month: 'long' });
            const month = monthNames.indexOf(orderMonthName);
            if (!acc[month]) {
              acc[month] = 0;
            }
            acc[month]++;
            return acc;
          }, [])
        },
        {
          name: 'Pendente',
          type: 'bar',
          stack: 'orders',
          emphasis: {
            focus: 'series'
          },
          color: statusOrderColorMap.get('Pendente'),
          data: pendingOrders.reduce((acc, order) => {
            const orderMonthName = new Date(order.dateCreated).toLocaleString('pt-BR', { month: 'long' });
            const month = monthNames.indexOf(orderMonthName);
            if (!acc[month]) {
              acc[month] = 0;
            }
            acc[month]++;
            return acc;
          }, [])
        },
        {
          name: 'Cancelado',
          type: 'bar',
          stack: 'orders',
          emphasis: {
            focus: 'series'
          },
          color: statusOrderColorMap.get('Cancelado'),
          data: canceledOrders.reduce((acc, order) => {
            const orderMonthName = new Date(order.dateCreated).toLocaleString('pt-BR', { month: 'long' });
            const month = monthNames.indexOf(orderMonthName);
            if (!acc[month]) {
              acc[month] = 0;
            }
            acc[month]++;
            return acc;
          }, [])
        },
      ]
    };

    echartRef.current.setOption(option)
    echartRef.current.hideLoading()
  }, [ordersData]);

  return (<div ref={chartRef} style={{ height: '600px', width: '100%' }} />)
};

export default OrdersBarChart;