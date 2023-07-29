import Store from '../dao/classes/stores.dao.js';

const storeService = new Store();

export const getStores = async (req, res) => {
  const result = await storeService.getStores();

  if (!result) return res.status(500).send({ status: 'error', error: 'Something happend' });
  res.send({ status: 'success', result });
};

export const getStoreByID = async (req, res) => {
  const { sid } = req.params;

  const result = await storeService.getStoreByID(sid);
  if (!result) return res.status(500).send({ status: 'error', error: 'Something happend' });

  res.send({ status: 'success', result });
};

export const createStore = async (req, res) => {
  const store = req.body;

  const result = await storeService.saveStore(store);
  if (!result) return res.status(500).send({ status: 'error', error: 'Something happend' });

  res.send({ status: 'success', result });
};

export const addProduct = async (req, res) => {
  //1 saca los parametros del req
  const product = req.body;
  const { sid } = req.params;

  //2 llamar al service...
  const store = await storeService.getStoreByID(sid);
  store.products.push(product);
  const result = await storeService.updateStore(sid, store);

  //5 responde al usuario
  res.send({ status: 'success', result });
};
