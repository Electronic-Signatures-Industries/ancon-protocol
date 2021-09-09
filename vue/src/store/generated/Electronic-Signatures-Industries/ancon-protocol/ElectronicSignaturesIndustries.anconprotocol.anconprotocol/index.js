import { txClient, queryClient, MissingWalletError } from './module';
// @ts-ignore
import { SpVuexError } from '@starport/vuex';
import { Owner } from "./module/types/anconprotocol/did_registry";
import { Delegate } from "./module/types/anconprotocol/did_registry";
import { Change } from "./module/types/anconprotocol/did_registry";
import { Attribute } from "./module/types/anconprotocol/did_registry";
import { QueryNonceRequest } from "./module/types/anconprotocol/query";
import { QueryNonceResponse } from "./module/types/anconprotocol/query";
import { QueryOwnersResponse } from "./module/types/anconprotocol/query";
import { MsgSetAttribute } from "./module/types/anconprotocol/tx";
import { MsgSetAttributeResponse } from "./module/types/anconprotocol/tx";
import { MsgFileMetadataResponse } from "./module/types/anconprotocol/tx";
export { Owner, Delegate, Change, Attribute, QueryNonceRequest, QueryNonceResponse, QueryOwnersResponse, MsgSetAttribute, MsgSetAttributeResponse, MsgFileMetadataResponse };
async function initTxClient(vuexGetters) {
    return await txClient(vuexGetters['common/wallet/signer'], {
        addr: vuexGetters['common/env/apiTendermint']
    });
}
async function initQueryClient(vuexGetters) {
    return await queryClient({
        addr: vuexGetters['common/env/apiCosmos']
    });
}
function mergeResults(value, next_values) {
    for (let prop of Object.keys(next_values)) {
        if (Array.isArray(next_values[prop])) {
            value[prop] = [...value[prop], ...next_values[prop]];
        }
        else {
            value[prop] = next_values[prop];
        }
    }
    return value;
}
function getStructure(template) {
    let structure = { fields: [] };
    for (const [key, value] of Object.entries(template)) {
        let field = {};
        field.name = key;
        field.type = typeof value;
        structure.fields.push(field);
    }
    return structure;
}
const getDefaultState = () => {
    return {
        ReadWithPath: {},
        ReadFile: {},
        Read: {},
        IdentifyOwner: {},
        GetAttributes: {},
        Resource: {},
        ReadDelegate: {},
        _Structure: {
            Owner: getStructure(Owner.fromPartial({})),
            Delegate: getStructure(Delegate.fromPartial({})),
            Change: getStructure(Change.fromPartial({})),
            Attribute: getStructure(Attribute.fromPartial({})),
            QueryNonceRequest: getStructure(QueryNonceRequest.fromPartial({})),
            QueryNonceResponse: getStructure(QueryNonceResponse.fromPartial({})),
            QueryOwnersResponse: getStructure(QueryOwnersResponse.fromPartial({})),
            MsgSetAttribute: getStructure(MsgSetAttribute.fromPartial({})),
            MsgSetAttributeResponse: getStructure(MsgSetAttributeResponse.fromPartial({})),
            MsgFileMetadataResponse: getStructure(MsgFileMetadataResponse.fromPartial({})),
        },
        _Subscriptions: new Set(),
    };
};
// initial state
const state = getDefaultState();
export default {
    namespaced: true,
    state,
    mutations: {
        RESET_STATE(state) {
            Object.assign(state, getDefaultState());
        },
        QUERY(state, { query, key, value }) {
            state[query][JSON.stringify(key)] = value;
        },
        SUBSCRIBE(state, subscription) {
            state._Subscriptions.add(subscription);
        },
        UNSUBSCRIBE(state, subscription) {
            state._Subscriptions.delete(subscription);
        }
    },
    getters: {
        getReadWithPath: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.ReadWithPath[JSON.stringify(params)] ?? {};
        },
        getReadFile: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.ReadFile[JSON.stringify(params)] ?? {};
        },
        getRead: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.Read[JSON.stringify(params)] ?? {};
        },
        getIdentifyOwner: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.IdentifyOwner[JSON.stringify(params)] ?? {};
        },
        getGetAttributes: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.GetAttributes[JSON.stringify(params)] ?? {};
        },
        getResource: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.Resource[JSON.stringify(params)] ?? {};
        },
        getReadDelegate: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.ReadDelegate[JSON.stringify(params)] ?? {};
        },
        getTypeStructure: (state) => (type) => {
            return state._Structure[type].fields;
        }
    },
    actions: {
        init({ dispatch, rootGetters }) {
            console.log('Vuex module: ElectronicSignaturesIndustries.anconprotocol.anconprotocol initialized!');
            if (rootGetters['common/env/client']) {
                rootGetters['common/env/client'].on('newblock', () => {
                    dispatch('StoreUpdate');
                });
            }
        },
        resetState({ commit }) {
            commit('RESET_STATE');
        },
        unsubscribe({ commit }, subscription) {
            commit('UNSUBSCRIBE', subscription);
        },
        async StoreUpdate({ state, dispatch }) {
            state._Subscriptions.forEach(async (subscription) => {
                try {
                    await dispatch(subscription.action, subscription.payload);
                }
                catch (e) {
                    throw new SpVuexError('Subscriptions: ' + e.message);
                }
            });
        },
        async QueryReadWithPath({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params: { ...key }, query = null }) {
            try {
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryReadWithPath(key.cid, key.path)).data;
                commit('QUERY', { query: 'ReadWithPath', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryReadWithPath', payload: { options: { all }, params: { ...key }, query } });
                return getters['getReadWithPath']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new SpVuexError('QueryClient:QueryReadWithPath', 'API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryReadFile({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params: { ...key }, query = null }) {
            try {
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryReadFile(key.cid, key.path)).data;
                commit('QUERY', { query: 'ReadFile', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryReadFile', payload: { options: { all }, params: { ...key }, query } });
                return getters['getReadFile']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new SpVuexError('QueryClient:QueryReadFile', 'API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryRead({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params: { ...key }, query = null }) {
            try {
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryRead(key.cid, query)).data;
                while (all && value.pagination && value.pagination.nextKey != null) {
                    let next_values = (await queryClient.queryRead(key.cid, { ...query, 'pagination.key': value.pagination.nextKey })).data;
                    value = mergeResults(value, next_values);
                }
                commit('QUERY', { query: 'Read', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryRead', payload: { options: { all }, params: { ...key }, query } });
                return getters['getRead']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new SpVuexError('QueryClient:QueryRead', 'API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryIdentifyOwner({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params: { ...key }, query = null }) {
            try {
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryIdentifyOwner(key.address)).data;
                commit('QUERY', { query: 'IdentifyOwner', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryIdentifyOwner', payload: { options: { all }, params: { ...key }, query } });
                return getters['getIdentifyOwner']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new SpVuexError('QueryClient:QueryIdentifyOwner', 'API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryGetAttributes({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params: { ...key }, query = null }) {
            try {
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryGetAttributes(key.address)).data;
                commit('QUERY', { query: 'GetAttributes', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryGetAttributes', payload: { options: { all }, params: { ...key }, query } });
                return getters['getGetAttributes']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new SpVuexError('QueryClient:QueryGetAttributes', 'API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryResource({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params: { ...key }, query = null }) {
            try {
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryResource(key.cid, query)).data;
                while (all && value.pagination && value.pagination.nextKey != null) {
                    let next_values = (await queryClient.queryResource(key.cid, { ...query, 'pagination.key': value.pagination.nextKey })).data;
                    value = mergeResults(value, next_values);
                }
                commit('QUERY', { query: 'Resource', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryResource', payload: { options: { all }, params: { ...key }, query } });
                return getters['getResource']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new SpVuexError('QueryClient:QueryResource', 'API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryReadDelegate({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params: { ...key }, query = null }) {
            try {
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryReadDelegate(key.id)).data;
                commit('QUERY', { query: 'ReadDelegate', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryReadDelegate', payload: { options: { all }, params: { ...key }, query } });
                return getters['getReadDelegate']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new SpVuexError('QueryClient:QueryReadDelegate', 'API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async sendMsgMetadata({ rootGetters }, { value, fee = [], memo = '' }) {
            try {
                const txClient = await initTxClient(rootGetters);
                const msg = await txClient.msgMetadata(value);
                const result = await txClient.signAndBroadcast([msg], { fee: { amount: fee,
                        gas: "200000" }, memo });
                return result;
            }
            catch (e) {
                if (e == MissingWalletError) {
                    throw new SpVuexError('TxClient:MsgMetadata:Init', 'Could not initialize signing client. Wallet is required.');
                }
                else {
                    throw new SpVuexError('TxClient:MsgMetadata:Send', 'Could not broadcast Tx: ' + e.message);
                }
            }
        },
        async sendMsgFile({ rootGetters }, { value, fee = [], memo = '' }) {
            try {
                const txClient = await initTxClient(rootGetters);
                const msg = await txClient.msgFile(value);
                const result = await txClient.signAndBroadcast([msg], { fee: { amount: fee,
                        gas: "200000" }, memo });
                return result;
            }
            catch (e) {
                if (e == MissingWalletError) {
                    throw new SpVuexError('TxClient:MsgFile:Init', 'Could not initialize signing client. Wallet is required.');
                }
                else {
                    throw new SpVuexError('TxClient:MsgFile:Send', 'Could not broadcast Tx: ' + e.message);
                }
            }
        },
        async sendMsgRevokeDelegate({ rootGetters }, { value, fee = [], memo = '' }) {
            try {
                const txClient = await initTxClient(rootGetters);
                const msg = await txClient.msgRevokeDelegate(value);
                const result = await txClient.signAndBroadcast([msg], { fee: { amount: fee,
                        gas: "200000" }, memo });
                return result;
            }
            catch (e) {
                if (e == MissingWalletError) {
                    throw new SpVuexError('TxClient:MsgRevokeDelegate:Init', 'Could not initialize signing client. Wallet is required.');
                }
                else {
                    throw new SpVuexError('TxClient:MsgRevokeDelegate:Send', 'Could not broadcast Tx: ' + e.message);
                }
            }
        },
        async sendMsgRevokeAttribute({ rootGetters }, { value, fee = [], memo = '' }) {
            try {
                const txClient = await initTxClient(rootGetters);
                const msg = await txClient.msgRevokeAttribute(value);
                const result = await txClient.signAndBroadcast([msg], { fee: { amount: fee,
                        gas: "200000" }, memo });
                return result;
            }
            catch (e) {
                if (e == MissingWalletError) {
                    throw new SpVuexError('TxClient:MsgRevokeAttribute:Init', 'Could not initialize signing client. Wallet is required.');
                }
                else {
                    throw new SpVuexError('TxClient:MsgRevokeAttribute:Send', 'Could not broadcast Tx: ' + e.message);
                }
            }
        },
        async sendMsgGrantAttribute({ rootGetters }, { value, fee = [], memo = '' }) {
            try {
                const txClient = await initTxClient(rootGetters);
                const msg = await txClient.msgGrantAttribute(value);
                const result = await txClient.signAndBroadcast([msg], { fee: { amount: fee,
                        gas: "200000" }, memo });
                return result;
            }
            catch (e) {
                if (e == MissingWalletError) {
                    throw new SpVuexError('TxClient:MsgGrantAttribute:Init', 'Could not initialize signing client. Wallet is required.');
                }
                else {
                    throw new SpVuexError('TxClient:MsgGrantAttribute:Send', 'Could not broadcast Tx: ' + e.message);
                }
            }
        },
        async sendMsgChangeOwner({ rootGetters }, { value, fee = [], memo = '' }) {
            try {
                const txClient = await initTxClient(rootGetters);
                const msg = await txClient.msgChangeOwner(value);
                const result = await txClient.signAndBroadcast([msg], { fee: { amount: fee,
                        gas: "200000" }, memo });
                return result;
            }
            catch (e) {
                if (e == MissingWalletError) {
                    throw new SpVuexError('TxClient:MsgChangeOwner:Init', 'Could not initialize signing client. Wallet is required.');
                }
                else {
                    throw new SpVuexError('TxClient:MsgChangeOwner:Send', 'Could not broadcast Tx: ' + e.message);
                }
            }
        },
        async sendMsgGrantDelegate({ rootGetters }, { value, fee = [], memo = '' }) {
            try {
                const txClient = await initTxClient(rootGetters);
                const msg = await txClient.msgGrantDelegate(value);
                const result = await txClient.signAndBroadcast([msg], { fee: { amount: fee,
                        gas: "200000" }, memo });
                return result;
            }
            catch (e) {
                if (e == MissingWalletError) {
                    throw new SpVuexError('TxClient:MsgGrantDelegate:Init', 'Could not initialize signing client. Wallet is required.');
                }
                else {
                    throw new SpVuexError('TxClient:MsgGrantDelegate:Send', 'Could not broadcast Tx: ' + e.message);
                }
            }
        },
        async MsgMetadata({ rootGetters }, { value }) {
            try {
                const txClient = await initTxClient(rootGetters);
                const msg = await txClient.msgMetadata(value);
                return msg;
            }
            catch (e) {
                if (e == MissingWalletError) {
                    throw new SpVuexError('TxClient:MsgMetadata:Init', 'Could not initialize signing client. Wallet is required.');
                }
                else {
                    throw new SpVuexError('TxClient:MsgMetadata:Create', 'Could not create message: ' + e.message);
                }
            }
        },
        async MsgFile({ rootGetters }, { value }) {
            try {
                const txClient = await initTxClient(rootGetters);
                const msg = await txClient.msgFile(value);
                return msg;
            }
            catch (e) {
                if (e == MissingWalletError) {
                    throw new SpVuexError('TxClient:MsgFile:Init', 'Could not initialize signing client. Wallet is required.');
                }
                else {
                    throw new SpVuexError('TxClient:MsgFile:Create', 'Could not create message: ' + e.message);
                }
            }
        },
        async MsgRevokeDelegate({ rootGetters }, { value }) {
            try {
                const txClient = await initTxClient(rootGetters);
                const msg = await txClient.msgRevokeDelegate(value);
                return msg;
            }
            catch (e) {
                if (e == MissingWalletError) {
                    throw new SpVuexError('TxClient:MsgRevokeDelegate:Init', 'Could not initialize signing client. Wallet is required.');
                }
                else {
                    throw new SpVuexError('TxClient:MsgRevokeDelegate:Create', 'Could not create message: ' + e.message);
                }
            }
        },
        async MsgRevokeAttribute({ rootGetters }, { value }) {
            try {
                const txClient = await initTxClient(rootGetters);
                const msg = await txClient.msgRevokeAttribute(value);
                return msg;
            }
            catch (e) {
                if (e == MissingWalletError) {
                    throw new SpVuexError('TxClient:MsgRevokeAttribute:Init', 'Could not initialize signing client. Wallet is required.');
                }
                else {
                    throw new SpVuexError('TxClient:MsgRevokeAttribute:Create', 'Could not create message: ' + e.message);
                }
            }
        },
        async MsgGrantAttribute({ rootGetters }, { value }) {
            try {
                const txClient = await initTxClient(rootGetters);
                const msg = await txClient.msgGrantAttribute(value);
                return msg;
            }
            catch (e) {
                if (e == MissingWalletError) {
                    throw new SpVuexError('TxClient:MsgGrantAttribute:Init', 'Could not initialize signing client. Wallet is required.');
                }
                else {
                    throw new SpVuexError('TxClient:MsgGrantAttribute:Create', 'Could not create message: ' + e.message);
                }
            }
        },
        async MsgChangeOwner({ rootGetters }, { value }) {
            try {
                const txClient = await initTxClient(rootGetters);
                const msg = await txClient.msgChangeOwner(value);
                return msg;
            }
            catch (e) {
                if (e == MissingWalletError) {
                    throw new SpVuexError('TxClient:MsgChangeOwner:Init', 'Could not initialize signing client. Wallet is required.');
                }
                else {
                    throw new SpVuexError('TxClient:MsgChangeOwner:Create', 'Could not create message: ' + e.message);
                }
            }
        },
        async MsgGrantDelegate({ rootGetters }, { value }) {
            try {
                const txClient = await initTxClient(rootGetters);
                const msg = await txClient.msgGrantDelegate(value);
                return msg;
            }
            catch (e) {
                if (e == MissingWalletError) {
                    throw new SpVuexError('TxClient:MsgGrantDelegate:Init', 'Could not initialize signing client. Wallet is required.');
                }
                else {
                    throw new SpVuexError('TxClient:MsgGrantDelegate:Create', 'Could not create message: ' + e.message);
                }
            }
        },
    }
};
