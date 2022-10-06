const logger = require('../lib/logger');
const deviceDao = require('../dao/deviceDao');

const service = {
  // device 입력
  async reg(params) {
    let inserted = null;

    try {
      inserted = await deviceDao.insert(params);
      logger.debug(`(deviceService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(deviceService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // selectList
  async list(params) {
    let result = null;

    try {
      result = await deviceDao.selectList(params);
      logger.debug(`(deviceService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(deviceService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // selectInfo
  async info(params) {
    let result = null;

    try {
      result = await deviceDao.selectInfo(params);
      logger.debug(`(deviceService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(deviceService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // update
  async edit(params) {
    let result = null;

    try {
      result = await deviceDao.update(params);
      logger.debug(`(deviceService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(deviceService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // delelte
  async delete(params) {
    let result = null;

    try {
      result = await deviceDao.delete(params);
      logger.debug(`(deviceService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(deviceService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;
