import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { SyncLoading } from '../../../components/SyncLoading';
import useRegisterMaintenanceOrder from '../hooks/useRegisterMaintenanceOrder.hook';

export function SyncOperator() {
  // const queryClient = useQueryClient();
  const { navigate } = useNavigation();

  const {
    sendQueuedCreateMaintenanceOrders,
    isSyncFinished: isCreateOMSyncFinished,
  } = useRegisterMaintenanceOrder();

  const [isSyncFinished, setIsSyncFinished] = useState(false);
  // const [isSyncFinished, setIsSyncFinished] = useState({
  //   createOM: false,
  //   editOM: false,
  // });

  // // Create OM Section
  // const [queuedCreateNewMaintenanceOrder, setQueuedCreateNewMaintenanceOrder] =
  //   useMMKVObject<NewMaintenanceOrder.Payload[]>(
  //     'queuedCreateNewMaintenanceOrder',
  //   );
  // if (queuedCreateNewMaintenanceOrder === undefined)
  //   setQueuedCreateNewMaintenanceOrder([]);

  // const removeOMFromCreateOMQueue = (omIndex: number | undefined) => {
  //   if (!queuedCreateNewMaintenanceOrder || omIndex === undefined) return;

  //   const newQueue = queuedCreateNewMaintenanceOrder.filter((_, index) => {
  //     return index !== omIndex;
  //   });

  //   setQueuedCreateNewMaintenanceOrder(newQueue);
  // };

  // const createNewMaintenanceOrderMutation = useMutation({
  //   mutationFn: createNewMaintenanceOrder,
  //   onSuccess: (response, request) => {
  //     // console.log('Request => ', request);
  //     const isStatusTrue = response.data.status === true;
  //     if (isStatusTrue) {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });

  //       // Remove OM from queue
  //       setTimeout(() => {
  //         removeOMFromCreateOMQueue(request.omIndex);
  //       }, 1000);

  //       // Show alert with response message
  //       const formattedMessage = `
  //       Código do Bem:
  //       ${request?.asset_code}

  //       Contador:
  //       ${request?.counter}

  //       ${
  //         request.symptoms[0].description &&
  //         `Sintoma:
  //         ${request?.symptoms[0].description}`
  //       }

  //       ${
  //         request.obs &&
  //         `Observação:
  //         ${request?.obs}`
  //       }

  //         Mensagem:
  //         ${response.data.return.message}`;

  //       Alert.alert('Sucesso:', formattedMessage);
  //     } else {
  //       // Remove OM from queue
  //       setTimeout(() => {
  //         removeOMFromCreateOMQueue(request.omIndex);
  //       }, 1000);

  //       // Show alert with response message
  //       const formattedMessage = `
  //       Código do Bem:
  //       ${request?.asset_code}

  //       Contador:
  //       ${request?.counter}

  //       ${
  //         request.symptoms[0].description &&
  //         `Sintoma:
  //         ${request?.symptoms[0].description}`
  //       }

  //       ${
  //         request.obs &&
  //         `Observação:
  //         ${request?.obs}`
  //       }

  //         Motivo do Erro:
  //         ${response.data.return[0]}`;

  //       Alert.alert(
  //         'Opa! Algo deu errado ao sincronizar esta requisição:',
  //         formattedMessage,
  //       );
  //     }
  //   },
  //   onError: (error) => {
  //     Alert.alert('Erro', JSON.stringify(error));
  //   },
  // });

  // const sendQueuedCreateMaintenanceOrders = () => {
  //   setIsSyncFinished((prev) => ({ ...prev, createOM: false }));
  //   if (
  //     !queuedCreateNewMaintenanceOrder ||
  //     queuedCreateNewMaintenanceOrder.length === 0
  //   ) {
  //     setIsSyncFinished((prev) => ({ ...prev, createOM: true }));
  //     return;
  //   }
  //   if (queuedCreateNewMaintenanceOrder.length > 0) {
  //     queuedCreateNewMaintenanceOrder.forEach((om, index) => {
  //       const omWithIndex = { ...om, omIndex: index };
  //       createNewMaintenanceOrderMutation.mutate(omWithIndex);

  //       // When the last OM is sent, set isSyncFinished to true
  //       if (index === queuedCreateNewMaintenanceOrder.length - 1) {
  //         setTimeout(() => {
  //           setIsSyncFinished((prev) => ({ ...prev, createOM: true }));
  //         }, 3000);
  //       }
  //     });
  //   } else {
  //     setIsSyncFinished((prev) => ({ ...prev, createOM: true }));
  //   }
  // };
  // //

  // // Edit OM Section
  // const [queuedEditMaintenanceOrder, setQueuedEditMaintenanceOrder] =
  //   useMMKVObject<EditedMaintenanceOrder[]>('queuedEditMaintenanceOrder');
  // if (queuedEditMaintenanceOrder === undefined)
  //   setQueuedEditMaintenanceOrder([]);

  // const removeFromEditOMQueue = (om: EditedMaintenanceOrder | undefined) => {
  //   if (!queuedEditMaintenanceOrder || om === undefined) return;

  //   const newQueue = queuedEditMaintenanceOrder.filter((queuedOM) => {
  //     return queuedOM.id !== om.id;
  //   });

  //   setQueuedEditMaintenanceOrder(newQueue);
  // };

  // const editMaintenanceOrderMutation = useMutation({
  //   mutationFn: editMaintenanceOrder,
  //   onSuccess: (response, request) => {
  //     const isStatusTrue = response.data.status === true;
  //     if (isStatusTrue) {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });

  //       // Remove OM from queue
  //       setTimeout(() => {
  //         removeFromEditOMQueue(request);
  //       }, 1000);

  //       // Show alert with response message
  //       const formattedMessage = `
  //       Código do Bem:
  //       ${request?.asset_code}

  //       Contador:
  //       ${request?.counter}

  //       ${
  //         request.symptoms.length > 0 &&
  //         `Sintoma:
  //         ${request?.symptoms.map((symptom) => symptom.description).join(', ')}`
  //       }

  //         Mensagem:
  //         ${response.data.return.message}`;

  //       Alert.alert('Sucesso:', formattedMessage);
  //     } else {
  //       // Remove OM from queue
  //       setTimeout(() => {
  //         removeFromEditOMQueue(request);
  //       }, 1000);

  //       // Show alert with response message
  //       const formattedMessage = `
  //       Código do Bem:
  //       ${request?.asset_code}

  //       Contador:
  //       ${request?.counter}

  //       ${
  //         request.symptoms[0].description &&
  //         `Sintoma:
  //         ${request?.symptoms[0].description}`
  //       }

  //       ${
  //         request.obs &&
  //         `Observação:
  //         ${request?.obs}`
  //       }

  //         Motivo do Erro:
  //         ${response.data.return[0]}`;

  //       Alert.alert(
  //         'Opa! Algo deu errado ao sincronizar esta requisição:',
  //         formattedMessage,
  //       );
  //     }
  //   },
  //   onError: (error) => {
  //     Alert.alert('Erro', JSON.stringify(error));
  //   },
  // });

  // const sendQueuedEditMaintenanceOrders = () => {
  //   setIsSyncFinished((prev) => ({ ...prev, editOM: false }));
  //   if (
  //     !queuedEditMaintenanceOrder ||
  //     queuedEditMaintenanceOrder.length === 0
  //   ) {
  //     setIsSyncFinished((prev) => ({ ...prev, editOM: true }));
  //     return;
  //   }
  //   if (queuedEditMaintenanceOrder.length > 0) {
  //     queuedEditMaintenanceOrder.forEach((om, index) => {
  //       console.log('REQ => ', om);
  //       const omWithIndex = { ...om, omIndex: index };
  //       editMaintenanceOrderMutation.mutate(omWithIndex);

  //       // When the last OM is sent, set isSyncFinished to true
  //       if (index === queuedEditMaintenanceOrder.length - 1) {
  //         setTimeout(() => {
  //           setIsSyncFinished((prev) => ({ ...prev, editOM: true }));
  //         }, 2000);
  //       }
  //     });
  //   } else {
  //     setIsSyncFinished((prev) => ({ ...prev, editOM: true }));
  //   }
  // };
  // //

  // const handleNavigation = () => {
  //   if (Object.values(isSyncFinished).every((value) => value === true)) {
  //     setTimeout(() => {
  //       navigate('HomeOperador');
  //     }, 3000);
  //   }
  // };

  const handleNavigation = () => {
    if (isSyncFinished) {
      setTimeout(() => {
        navigate('HomeOperador');
      }, 3000);
    }
  };

  useFocusEffect(
    useCallback(() => {
      sendQueuedCreateMaintenanceOrders();
      // sendQueuedEditMaintenanceOrders();
    }, []),
  );

  // console.log('isSyncFinished => ', isSyncFinished);

  useEffect(() => {
    handleNavigation();
  }, [isSyncFinished]);

  useEffect(() => {
    if (isCreateOMSyncFinished) {
      setIsSyncFinished(true);
    } else {
      setIsSyncFinished(false);
    }
  }, [isCreateOMSyncFinished]);

  // if (!queuedCreateNewMaintenanceOrder && !queuedEditMaintenanceOrder) {
  //   setTimeout(() => {
  //     // setIsSyncFinished(false);
  //     navigate('HomeOperador');
  //   }, 2000);
  //   return (
  //     <Animated.View
  //       entering={FadeInDown}
  //       exiting={FadeOutDown}
  //       className="flex h-screen flex-1 flex-col items-center justify-center gap-5 px-5"
  //     >
  //       <CheckCircle color="#046700" weight="bold" size={64} />
  //       <Text className="font-poppinsBold text-xl text-zinc-900">
  //         Iniciando o aplicativo...
  //       </Text>
  //     </Animated.View>
  //   );
  // }

  // if (Object.values(isSyncFinished).every((value) => value === true)) {
  //   return (
  //     <Animated.View
  //       entering={FadeInDown}
  //       exiting={FadeOutDown}
  //       className="flex h-screen flex-1 flex-col items-center justify-center gap-5 px-5"
  //     >
  //       <CheckCircle color="#046700" weight="bold" size={64} />
  //       <Text className="font-poppinsBold text-xl text-zinc-900">
  //         Informações sincronizadas com sucesso!
  //       </Text>
  //       <CustomButton
  //         onPress={() => navigate('HomeOperador')}
  //         variant="primary"
  //       >
  //         Ir para a tela inicial
  //       </CustomButton>
  //     </Animated.View>
  //   );
  // }

  return <SyncLoading />;
}

export default SyncOperator;
