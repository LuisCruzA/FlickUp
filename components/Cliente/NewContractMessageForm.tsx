import React, { useState, useEffect } from 'react';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  KeyboardTypeOptions,
  Alert,
} from 'react-native';
import { post } from 'aws-amplify/api';
import type { Chat } from '~/types';
interface ContractFormProps {
    visible: boolean;
    chat: Chat;
    userId: string;
    onClose: () => void;
    onSubmit: (data: any) => void;
  }
  

interface PaymentSheetParams {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
}
  
const NewContractMessageForm = ({
  visible,
  chat,
  userId,
  onClose,
  onSubmit,
}: ContractFormProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [publishableKey, setPublishableKey] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchKey = async (): Promise<string> => {
    return 'pk_test_51RHBXFRKZO9Ue7KEat6tYTvqXKNgtPvXnv7VFyHlVLTHoaSZGMz0b1d48RG3eb7LhhRXHqU9vPY3aLXmsz1amLdf00hy3hHzYx'; // Ejemplo
  };

  const fetchPublishableKey = async () => {
    try {
      const key = await fetchKey();
      if (key) setPublishableKey(key);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentSheetParams = async (
    amount: number
  ): Promise<PaymentSheetParams | undefined> => {
    try {
      const restOperation = post({
        apiName: 'flickupApi',
        path: '/stripe',
        options: { body: { amount } }
      });
      const { body } = await restOperation.response;
      
      const data = (await body.json()) as unknown as PaymentSheetParams;
      console.log(data)
      
      return {
        paymentIntent: data.paymentIntent,
        ephemeralKey: data.ephemeralKey,
        customer: data.customer,
      };
    } catch (e: any) {
      console.log('POST call failed: ', JSON.parse(e.response.body));
    }
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  const [form, setForm] = useState<Record<string, string>>({
    start_date: '',
    end_date: '',
    agreed_amount: '',
    payment_terms: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const closeModal = () => {
    setForm({ start_date: '', end_date: '', agreed_amount: '', payment_terms: '' });
    onClose();
  };
  const handleSubmit = async () => {
    try {
      setSubmitting(true);
  
      const requiredFields = ['start_date', 'end_date', 'agreed_amount', 'payment_terms'];
      for (const field of requiredFields) {
        if (!form[field]?.trim()) {
          throw new Error(`El campo "${field}" no puede estar vacío.`);
        }
      }
  
      const amount = parseFloat(form.agreed_amount);
  
      const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams(amount) as PaymentSheetParams;
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "FlickUp",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
      });
  
      if (error) throw error;
  
      const { error: paymentError } = await presentPaymentSheet();
      if (paymentError) throw paymentError;
  
      const contractData = {
        project_id: chat.id_project,
        freelancer_id: chat.id_otrapersona,
        client_id: userId, 
        start_date: new Date(form.start_date).toISOString(),
        end_date: new Date(form.end_date).toISOString(),
        agreed_amount: amount,
        payment_terms: form.payment_terms.trim(),
        status: 'pendiente',
        contract_type: 'fijo',
        terms_conditions: '',
      };
  
      await post({
        apiName: 'flickupApi',
        path: '/contracts',
        options: {
          body: contractData
        }
      });
  
      onSubmit(contractData);
      closeModal();
  
    } catch (error: any) {
      Alert.alert('Error al crear el contrato', error.message);
    } finally {
      setSubmitting(false);
    }
  };
  

  if (loading || !publishableKey) return null;

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier"
      urlScheme="your-url-scheme"
    >
      <Modal visible={visible} animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1, backgroundColor: 'white' }}
        >
          <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 80 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}>Contrato</Text>
            <Text style={{ marginBottom: 24, color: '#6b7280', fontStyle: 'italic' }}>
              {chat.project_title}
            </Text>

            {[
              { label: 'Fecha de inicio (YYYY-MM-DD)', key: 'start_date' },
              { label: 'Fecha de entrega (YYYY-MM-DD)', key: 'end_date' },
              { label: 'Monto acordado (MXN)', key: 'agreed_amount', keyboardType: 'numeric' },
              {
                label: 'Condiciones de pago',
                key: 'payment_terms',
                multiline: true,
                style: { height: 128, textAlignVertical: 'top' },
              },
            ].map(({ label, key, multiline, style, keyboardType }) => (
              <View key={key} style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 4 }}>{label}</Text>
                <TextInput
                  style={[
                    { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12 },
                  ]}
                  value={form[key]}
                  onChangeText={text => handleChange(key, text)}
                  multiline={multiline}
                  keyboardType={keyboardType as KeyboardTypeOptions}
                />
              </View>
            ))}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 24 }}>
              <TouchableOpacity
                onPress={closeModal}
                style={{ flex: 1, borderRadius: 12, backgroundColor: '#e5e7eb', padding: 16 }}
                disabled={submitting}
              >
                <Text style={{ color: '#1f2937', fontWeight: '600' }}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit}
                style={{ flex: 1, borderRadius: 12, backgroundColor: '#2563eb', padding: 16 }}
                disabled={submitting}
              >
                <Text style={{ color: 'white', fontWeight: '600' }}>
                  {submitting ? 'Procesando...' : 'Proceder al pago'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </StripeProvider>
  );
};

export default NewContractMessageForm;