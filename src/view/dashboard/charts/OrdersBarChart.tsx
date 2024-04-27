import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts';
import { Api } from '@web/domain';
import { Order } from '@web/domain/order';



const OrdersBarChart = () => {
  const chartRef = useRef(null);
  const echartRef = useRef<null | echarts.ECharts>(null);

  const [ordersData, setOrdersData] = useState<Order[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await Api.Order.findMany()
      console.log(orders)
      setOrdersData(orders)
    }

    fetchOrders()
  }, [])

  useEffect(() => {
    const myChart = echarts.init(chartRef.current)

    myChart.showLoading()

    echartRef.current = myChart;

    return () => {
      myChart.dispose();
    }
  }, []);

  useEffect(() => {
    if (ordersData.length == 0) return;

    const canceledOrders = ordersData.filter(order => order.status === "Cancelled")
    const completedOrders = ordersData.filter(order => order.status === "Completed")
    const inProgressOrders = ordersData.filter(order => order.status === "In Progress")
    const pendingOrders = ordersData.filter(order => order.status === "Pending")
    const shippedOrders = ordersData.filter(order => order.status === "Shipped")

    const option: echarts.EChartsOption = {
      legend: {},
      title: {
        text: 'Ordens de Produção por Mês',
        left: '1%'
      },
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
          data: ordersData.map(order => new Date(order.dateCreated).toLocaleString('pt-BR', { month: 'long' })),
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
          name: 'Completados',
          type: 'bar',
          stack: 'orders',
          emphasis: {
            focus: 'series'
          },
          color: '#52c41a',
          data: completedOrders.reduce((acc, order) => {
            const month = new Date(order.dateCreated).getMonth();
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
          color: '#1890ff',
          data: inProgressOrders.reduce((acc, order) => {
            const month = new Date(order.dateCreated).getMonth();
            if (!acc[month]) {
              acc[month] = 0;
            }
            acc[month]++;
            return acc;
          }, [])
        },
        {
          name: 'Enviados',
          type: 'bar',
          stack: 'orders',
          emphasis: {
            focus: 'series'
          },
          color: '#722ed1',
          data: shippedOrders.reduce((acc, order) => {
            const month = new Date(order.dateCreated).getMonth();
            if (!acc[month]) {
              acc[month] = 0;
            }
            acc[month]++;
            return acc;
          }, [])
        },
        {
          name: 'Pendentes',
          type: 'bar',
          stack: 'orders',
          emphasis: {
            focus: 'series'
          },
          color: '#faad14',
          data: pendingOrders.reduce((acc, order) => {
            const month = new Date(order.dateCreated).getMonth();
            if (!acc[month]) {
              acc[month] = 0;
            }
            acc[month]++;
            return acc;
          }, [])
        },
        {
          name: 'Cancelados',
          type: 'bar',
          stack: 'orders',
          emphasis: {
            focus: 'series'
          },
          color: '#ff4d4f',
          data: canceledOrders.reduce((acc, order) => {
            const month = new Date(order.dateCreated).getMonth();
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