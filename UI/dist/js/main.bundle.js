/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "6d150c23cdc86b105ec3";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./index.js")(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/globals.js":
/*!******************************!*\
  !*** ./assets/js/globals.js ***!
  \******************************/
/*! exports provided: backdrop, sidenavWrapper, sidedrawer, loginBtn, createAccountBtn, food, foodCart, imageFile, imageOutput, edit1, edit2, rm2, rm1, closeUpdateFoodItem, closeDeleteFoodItem, orderBtn, orderBtn2, closeLocationForm, closeLocationForm2, cartClip, category, categoryList, closeOrderDetails, myCart, foodItemContainer, burger1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backdrop", function() { return backdrop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sidenavWrapper", function() { return sidenavWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sidedrawer", function() { return sidedrawer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginBtn", function() { return loginBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAccountBtn", function() { return createAccountBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "food", function() { return food; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "foodCart", function() { return foodCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "imageFile", function() { return imageFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "imageOutput", function() { return imageOutput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "edit1", function() { return edit1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "edit2", function() { return edit2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rm2", function() { return rm2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rm1", function() { return rm1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeUpdateFoodItem", function() { return closeUpdateFoodItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeDeleteFoodItem", function() { return closeDeleteFoodItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orderBtn", function() { return orderBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orderBtn2", function() { return orderBtn2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeLocationForm", function() { return closeLocationForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeLocationForm2", function() { return closeLocationForm2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cartClip", function() { return cartClip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "category", function() { return category; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "categoryList", function() { return categoryList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeOrderDetails", function() { return closeOrderDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "myCart", function() { return myCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "foodItemContainer", function() { return foodItemContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "burger1", function() { return burger1; });
/*.......Side navigation nodes............ */
var backdrop = document.getElementById("backdrop");
var sidenavWrapper = document.getElementById("sidenavWrapper");
var sidedrawer = document.getElementById("sidedrawer");
var loginBtn = document.getElementById("loginBtn");
var createAccountBtn = document.getElementById("createAccountBtn");
var food = document.getElementById("food");
var foodCart = document.getElementById("foodCart");
var imageFile = document.getElementById("file");
var imageOutput = document.getElementById("output");
var edit1 = document.getElementById("edit1");
var edit2 = document.getElementById("edit2");
var rm2 = document.getElementById("rm2");
var rm1 = document.getElementById("rm1");
var closeUpdateFoodItem = document.getElementById("closeUpdateFoodItem");
var closeDeleteFoodItem = document.getElementById("closeDeleteFoodItem");
var orderBtn = document.getElementById("orderBtn");
var orderBtn2 = document.getElementById("orderBtn2");
var closeLocationForm = document.getElementById('closeLocationForm');
var closeLocationForm2 = document.getElementById('closeLocationForm2');
var cartClip = document.getElementById('cartClip');
var category = document.getElementById('category');
var categoryList = document.getElementById('categoryList');
var closeOrderDetails = document.getElementById('closeOrderDetails');
var myCart = document.getElementById('myCart');
var foodItemContainer = document.getElementById('foodItemContainer');
var burger1 = document.getElementById("burger1");

/***/ }),

/***/ "./assets/js/modal.js":
/*!****************************!*\
  !*** ./assets/js/modal.js ***!
  \****************************/
/*! exports provided: showModal, closeModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showModal", function() { return showModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
var showModal = function showModal(id, modalBlock) {
  switch (modalBlock) {
    case 'deleteFoodItemContent':
      document.querySelector('#updateFoodItemContent').style.display = 'none';
      var deleteFoodItemContent = document.querySelector('#deleteFoodItemContent');

      if (deleteFoodItemContent.style.display === 'none') {
        deleteFoodItemContent.style.display = 'block';
      }

      document.getElementById(id).style.display = 'block';
      break;

    case 'locationForm':
      document.querySelector('#cart').style.display = 'none';
      var locationForm = document.querySelector('#locationForm');

      if (locationForm.style.display === 'none') {
        document.querySelector('#locationForm').style.display = 'block';
      }

      document.getElementById(id).style.display = 'block';
      break;

    case 'cart':
      document.querySelector('#locationForm').style.display = 'none';
      var cart = document.querySelector('#cart');

      if (cart.style.display === 'none') {
        document.querySelector("#cart").style.display = 'block';
      }

      document.getElementById(id).style.display = 'block';
      break;

    case 'orderDetail':
      var orderDetail = document.querySelector('#orderDetail');

      if (orderDetail.style.display === 'none') {
        document.querySelector("#orderDetail").style.display = 'block';
      }

      document.getElementById(id).style.display = 'block';
      break;

    default:
      document.querySelector('#updateFoodItemContent').style.display = 'block';
      document.querySelector('#deleteFoodItemContent').style.display = 'none';
      document.getElementById(id).style.display = 'block';
  }
};
var closeModal = function closeModal(id) {
  return document.getElementById(id).style.display = '';
};

/***/ }),

/***/ "./assets/js/sidenav.js":
/*!******************************!*\
  !*** ./assets/js/sidenav.js ***!
  \******************************/
/*! exports provided: opennav, closenav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opennav", function() { return opennav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closenav", function() { return closenav; });
var opennav = function opennav() {
  // console.log('sidedrawer is clicked');
  backdrop.style.display = 'block';
  sidenavWrapper.style.transform = 'translateX(0%)';
};
var closenav = function closenav() {
  backdrop.style.display = 'none';
  sidenavWrapper.style.transform = 'translateX(-100%)';
};

/***/ }),

/***/ "./assets/js/table.js":
/*!****************************!*\
  !*** ./assets/js/table.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var thSn = document.getElementById("th-sn");
var thCustomer = document.getElementById("th-customerName");
var thDescription = document.getElementById("th-description");
var thTime = document.getElementById("th-time");
var thDeliveryTime = document.getElementById("th-deliveryTime");
var thPrice = document.getElementById("th-price");
var thActions = document.getElementById("th-actions");
var thComplete = document.getElementById("th-complete");
var thPicture = document.getElementById("th-picture");
var thOrderDate = document.getElementById("th-orderDate");
var thOrderTime = document.getElementById("th-orderTime");
var thOrderQuantity = document.getElementById("th-quantity");
var thAmount = document.getElementById("th-amount");
var thStatus = document.getElementById("th-status");
var customerOrders = document.getElementById("customerOrders");
var userOrder = document.getElementById("userOrder");
var hSn = document.getElementById("h-sn");
var hCustomer = document.getElementById("h-customerName");
var hDescription = document.getElementById("h-description");
var hTime = document.getElementById("h-orderTime");
var hDeliveryTime = document.getElementById("h-deliveryTime");
var hPrice = document.getElementById("h-price");
var hActions = document.getElementById("h-actions");
var hComplete = document.getElementById("h-complete");
var scrollBlock = document.getElementById("scrollBlock");

function resCol() {
  var serialNoCol = thSn.getClientRects()[0].width;
  var customerCol = thCustomer.getClientRects()[0].width;
  var timeCol = thTime.getClientRects()[0].width;
  var descriptionCol = thDescription.getClientRects()[0].width;
  var deliveryTime = thDeliveryTime.getClientRects()[0].width;
  var priceCol = thPrice.getClientRects()[0].width;
  var actionsCol = thActions.getClientRects()[0].width;
  var completeCol = thComplete.getClientRects()[0].width;
  document.getElementById("h-sn").style.width = (serialNoCol - 10).toString().concat("px");
  document.getElementById("h-customerName").style.width = (customerCol - 10.9).toString().concat("px");
  document.getElementById("h-description").style.width = (descriptionCol - 10.9).toString().concat("px");
  document.getElementById("h-orderTime").style.width = (timeCol - 10.9).toString().concat("px");
  document.getElementById("h-deliveryTime").style.width = (deliveryTime - 10.9).toString().concat("px");
  document.getElementById("h-price").style.width = (priceCol - 10.9).toString().concat("px");
  document.getElementById("h-actions").style.width = (actionsCol - 10.9).toString().concat("px");
  document.getElementById("h-complete").style.width = (completeCol - 10.9).toString().concat("px");
}

function resCol2() {
  var serialNoCol = thSn.getClientRects()[0].width;
  var pictureCol = thPicture.getClientRects()[0].width;
  var descriptionCol = thDescription.getClientRects()[0].width;
  var dateCol = thOrderDate.getClientRects()[0].width;
  var timeCol = thOrderTime.getClientRects()[0].width;
  var quantityCol = thOrderQuantity.getClientRects()[0].width;
  var amountCol = thAmount.getClientRects()[0].width;
  var statusCol = thStatus.getClientRects()[0].width;
  document.getElementById("h-sn").style.width = (serialNoCol - 10.9).toString().concat("px");
  document.getElementById("h-picture").style.width = (pictureCol - 10.9).toString().concat("px");
  document.getElementById("h-description").style.width = (descriptionCol - 10.9).toString().concat("px");
  document.getElementById("h-orderDate").style.width = (dateCol - 10.9).toString().concat("px");
  document.getElementById("h-orderTime").style.width = (timeCol - 10.9).toString().concat("px");
  document.getElementById("h-quantity").style.width = (quantityCol - 10.9).toString().concat("px");
  document.getElementById("h-amount").style.width = (amountCol - 10.9).toString().concat("px");
  document.getElementById("h-status").style.width = (statusCol - 10.9).toString().concat("px");
}

function displayTableHeader() {
  var scrollBlockTop = scrollBlock.scrollTop;

  if (scrollBlockTop > 0 && window.visualViewport.width > 700) {
    document.getElementById("tableHeader").style.display = "flex";
  }

  if (scrollBlockTop === 0) {
    document.getElementById("tableHeader").style.display = "none";
  }
} // Get all elements with class="closebtn"


var close = document.getElementsByClassName("closebtn");
var i; // Loop through all close buttons

for (i = 0; i < close.length; i++) {
  // When someone clicks on a close button
  close[i].onclick = function () {
    // Get the parent of <span class="closebtn"> (<div class="alert">)
    var div = this.parentElement; // Set the opacity of div to 0 (transparent)

    div.style.opacity = "0"; // Hide the div after 600ms (the same amount of milliseconds it takes to fade out)

    setTimeout(function () {
      div.style.display = "none";
    }, 600);
  };
}

if (customerOrders) {
  window.addEventListener('load', resCol);
  window.addEventListener('resize', resCol);
  scrollBlock.addEventListener('scroll', displayTableHeader);
  scrollBlock.addEventListener('scroll', resCol);
  var order1 = document.getElementById("1");

  if (order1) {
    order1.addEventListener('click', function () {
      return showModal('modal');
    });
  }
}

;

var showModal = function showModal(id) {
  return document.getElementById(id).style.display = "block";
};

var closeModal = function closeModal(id) {
  document.getElementById(id).style.display = "none";
};

if (userOrder) {
  window.addEventListener('load', resCol2);
  window.addEventListener('resize', resCol2);
  scrollBlock.addEventListener('scroll', displayTableHeader);
  scrollBlock.addEventListener('scroll', resCol2);
}

/***/ }),

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/js/globals */ "./assets/js/globals.js");
/* harmony import */ var _assets_js_sidenav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/js/sidenav */ "./assets/js/sidenav.js");
/* harmony import */ var _assets_js_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/js/modal */ "./assets/js/modal.js");
/* harmony import */ var _assets_js_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/js/table */ "./assets/js/table.js");
/* harmony import */ var _assets_js_table__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_js_table__WEBPACK_IMPORTED_MODULE_4__);






if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["sidedrawer"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["sidedrawer"].onclick = function () {
    return Object(_assets_js_sidenav__WEBPACK_IMPORTED_MODULE_2__["opennav"])();
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["backdrop"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["backdrop"].onclick = function () {
    Object(_assets_js_sidenav__WEBPACK_IMPORTED_MODULE_2__["closenav"])();

    if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["categoryList"]) {
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["categoryList"].classList.add("-sidenav-food-navigation--isHidden");
    }
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["createAccountBtn"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["createAccountBtn"].onclick = function () {
    return window.location.href = "./user.html";
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["loginBtn"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["loginBtn"].onclick = function () {
    return window.location.href = "./user.html";
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["food"] || _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodCart"]) {
  window.addEventListener('scroll', function () {
    var foodClientRectY = _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["food"].getClientRects()[0].y;

    if (window.scrollY >= 370) {
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["food"].classList.add('foodNavWrapper-onWindowScroll');
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodItemContainer"].classList.add("-offset-l-2x");
    } else {
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["food"].classList.remove('foodNavWrapper-onWindowScroll');
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodItemContainer"].classList.remove("-offset-l-2x");
    }

    if (window.scrollY >= 40) {
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodCart"].classList.add('foodCart-onWindowScroll');
    } else {
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodCart"].classList.remove('foodCart-onWindowScroll');
    }

    if (window.scrollY >= 375) {
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["cartClip"].classList.add('cartClip-onWindowScroll');
    } else {
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["cartClip"].classList.remove('cartClip-onWindowScroll');
    }
  });
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["imageFile"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["imageFile"].onchange = function (event) {
    _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["imageOutput"].src = URL.createObjectURL(event.target.files[0]);
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["edit1"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["edit1"].onclick = function () {
    return Object(_assets_js_modal__WEBPACK_IMPORTED_MODULE_3__["showModal"])('modal', 'updateFoodItemContent');
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["edit2"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["edit2"].onclick = function () {
    return Object(_assets_js_modal__WEBPACK_IMPORTED_MODULE_3__["showModal"])('modal', 'updateFoodItemContent');
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["closeUpdateFoodItem"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["closeUpdateFoodItem"].onclick = function () {
    return Object(_assets_js_modal__WEBPACK_IMPORTED_MODULE_3__["closeModal"])('modal');
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["rm1"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["rm1"].onclick = function () {
    return Object(_assets_js_modal__WEBPACK_IMPORTED_MODULE_3__["showModal"])('modal', 'deleteFoodItemContent');
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["rm2"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["rm2"].onclick = function () {
    return Object(_assets_js_modal__WEBPACK_IMPORTED_MODULE_3__["showModal"])('modal', 'deleteFoodItemContent');
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["closeDeleteFoodItem"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["closeDeleteFoodItem"].onclick = function () {
    return Object(_assets_js_modal__WEBPACK_IMPORTED_MODULE_3__["closeModal"])('modal');
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["orderBtn"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["orderBtn"].onclick = function () {
    return Object(_assets_js_modal__WEBPACK_IMPORTED_MODULE_3__["showModal"])('modal', 'locationForm');
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["orderBtn2"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["orderBtn2"].onclick = function () {
    return Object(_assets_js_modal__WEBPACK_IMPORTED_MODULE_3__["showModal"])('modal', 'locationForm');
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["closeLocationForm"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["closeLocationForm"].onclick = function () {
    Object(_assets_js_modal__WEBPACK_IMPORTED_MODULE_3__["closeModal"])('modal');
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["closeLocationForm2"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["closeLocationForm2"].onclick = function () {
    Object(_assets_js_modal__WEBPACK_IMPORTED_MODULE_3__["closeModal"])('modal');
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["cartClip"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["cartClip"].onclick = function () {
    Object(_assets_js_modal__WEBPACK_IMPORTED_MODULE_3__["showModal"])('modal', 'cart');
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["category"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["category"].onclick = function () {
    _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["categoryList"].classList.remove("-sidenav-food-navigation--isHidden");
  };

  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["category"].onmouseover = function () {
    _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["categoryList"].classList.add("-sidenav-food-navigation--isHidden");
  };

  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["categoryList"].onclick = function () {
    _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["categoryList"].classList.add("-sidenav-food-navigation--isHidden");
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["closeOrderDetails"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["closeOrderDetails"].onclick = function () {
    Object(_assets_js_modal__WEBPACK_IMPORTED_MODULE_3__["closeModal"])('modal');
  };
}

var viewCart = true;

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["myCart"] && window.innerWidth > 900) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["myCart"].addEventListener('click', function (event) {
    console.log('mycart');
    event.preventDefault();

    if (viewCart) {
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodCart"].classList.remove('foodCart-isHidden');
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodCart"].classList.add('foodCart-isVisible');
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodItemContainer"].classList.remove('-col-l-9');
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodItemContainer"].classList.add('-col-l-8');
      viewCart = false;
    } else {
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodCart"].classList.add('foodCart-isHidden');
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodCart"].classList.remove('foodCart-isVisible');
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodItemContainer"].classList.add('-col-l-9');
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodItemContainer"].classList.remove('-col-l-8');
      viewCart = true;
    }
  });
  window.addEventListener('resize', function () {
    _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodCart"].classList.add('hide-on-medium-and-down');
    _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodCart"].classList.add('foodCart-isHidden');
    _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodCart"].classList.remove('foodCart-isVisible');
    _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodItemContainer"].classList.remove('-col-l-8');
    _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodItemContainer"].classList.add('-col-l-9');
  });
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["burger1"] && window.innerWidth > 900) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["burger1"].onclick = function () {
    _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodCart"].classList.remove('foodCart-isHidden');
    _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodCart"].classList.add('foodCart-isVisible');
    _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodItemContainer"].classList.remove('-col-l-9');
    _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodItemContainer"].classList.add('-col-l-8');
    viewCart = false;
  };
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2dsb2JhbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL21vZGFsLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9zaWRlbmF2LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiXSwibmFtZXMiOlsiYmFja2Ryb3AiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2lkZW5hdldyYXBwZXIiLCJzaWRlZHJhd2VyIiwibG9naW5CdG4iLCJjcmVhdGVBY2NvdW50QnRuIiwiZm9vZCIsImZvb2RDYXJ0IiwiaW1hZ2VGaWxlIiwiaW1hZ2VPdXRwdXQiLCJlZGl0MSIsImVkaXQyIiwicm0yIiwicm0xIiwiY2xvc2VVcGRhdGVGb29kSXRlbSIsImNsb3NlRGVsZXRlRm9vZEl0ZW0iLCJvcmRlckJ0biIsIm9yZGVyQnRuMiIsImNsb3NlTG9jYXRpb25Gb3JtIiwiY2xvc2VMb2NhdGlvbkZvcm0yIiwiY2FydENsaXAiLCJjYXRlZ29yeSIsImNhdGVnb3J5TGlzdCIsImNsb3NlT3JkZXJEZXRhaWxzIiwibXlDYXJ0IiwiZm9vZEl0ZW1Db250YWluZXIiLCJidXJnZXIxIiwic2hvd01vZGFsIiwiaWQiLCJtb2RhbEJsb2NrIiwicXVlcnlTZWxlY3RvciIsInN0eWxlIiwiZGlzcGxheSIsImRlbGV0ZUZvb2RJdGVtQ29udGVudCIsImxvY2F0aW9uRm9ybSIsImNhcnQiLCJvcmRlckRldGFpbCIsImNsb3NlTW9kYWwiLCJvcGVubmF2IiwidHJhbnNmb3JtIiwiY2xvc2VuYXYiLCJ0aFNuIiwidGhDdXN0b21lciIsInRoRGVzY3JpcHRpb24iLCJ0aFRpbWUiLCJ0aERlbGl2ZXJ5VGltZSIsInRoUHJpY2UiLCJ0aEFjdGlvbnMiLCJ0aENvbXBsZXRlIiwidGhQaWN0dXJlIiwidGhPcmRlckRhdGUiLCJ0aE9yZGVyVGltZSIsInRoT3JkZXJRdWFudGl0eSIsInRoQW1vdW50IiwidGhTdGF0dXMiLCJjdXN0b21lck9yZGVycyIsInVzZXJPcmRlciIsImhTbiIsImhDdXN0b21lciIsImhEZXNjcmlwdGlvbiIsImhUaW1lIiwiaERlbGl2ZXJ5VGltZSIsImhQcmljZSIsImhBY3Rpb25zIiwiaENvbXBsZXRlIiwic2Nyb2xsQmxvY2siLCJyZXNDb2wiLCJzZXJpYWxOb0NvbCIsImdldENsaWVudFJlY3RzIiwid2lkdGgiLCJjdXN0b21lckNvbCIsInRpbWVDb2wiLCJkZXNjcmlwdGlvbkNvbCIsImRlbGl2ZXJ5VGltZSIsInByaWNlQ29sIiwiYWN0aW9uc0NvbCIsImNvbXBsZXRlQ29sIiwidG9TdHJpbmciLCJjb25jYXQiLCJyZXNDb2wyIiwicGljdHVyZUNvbCIsImRhdGVDb2wiLCJxdWFudGl0eUNvbCIsImFtb3VudENvbCIsInN0YXR1c0NvbCIsImRpc3BsYXlUYWJsZUhlYWRlciIsInNjcm9sbEJsb2NrVG9wIiwic2Nyb2xsVG9wIiwid2luZG93IiwidmlzdWFsVmlld3BvcnQiLCJjbG9zZSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJpIiwibGVuZ3RoIiwib25jbGljayIsImRpdiIsInBhcmVudEVsZW1lbnQiLCJvcGFjaXR5Iiwic2V0VGltZW91dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvcmRlcjEiLCJjbGFzc0xpc3QiLCJhZGQiLCJsb2NhdGlvbiIsImhyZWYiLCJmb29kQ2xpZW50UmVjdFkiLCJ5Iiwic2Nyb2xsWSIsInJlbW92ZSIsIm9uY2hhbmdlIiwiZXZlbnQiLCJzcmMiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJ0YXJnZXQiLCJmaWxlcyIsIm9ubW91c2VvdmVyIiwidmlld0NhcnQiLCJpbm5lcldpZHRoIiwiY29uc29sZSIsImxvZyIsInByZXZlbnREZWZhdWx0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUFrQiw4QkFBOEI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDb0UsT0FBUixHQUFrQixZQUFNO0FBQ3RCdkYsSUFBQSwyREFBUSxDQUFDOEYsU0FBVCxDQUFtQk8sTUFBbkIsQ0FBMEIsbUJBQTFCO0FBQ0VyRyxJQUFBLDJEQUFRLENBQUM4RixTQUFULENBQW1CQyxHQUFuQixDQUF1QixvQkFBdkI7QUFDQTdFLElBQUEsb0VBQWlCLENBQUM0RSxTQUFsQixDQUE0Qk8sTUFBNUIsQ0FBbUMsVUFBbkM7QUFDQW5GLElBQUEsb0VBQWlCLENBQUM0RSxTQUFsQixDQUE0QkMsR0FBNUIsQ0FBZ0MsVUFBaEM7QUFDQWUsWUFBUSxHQUFHLEtBQVg7QUFDSCxHQU5EO0FBT0QsQyIsImZpbGUiOiJqcy9tYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0O1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiNmQxNTBjMjNjZGM4NmIxMDVlYzNcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwibWFpblwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZShcIi4vaW5kZXguanNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiLyouLi4uLi4uU2lkZSBuYXZpZ2F0aW9uIG5vZGVzLi4uLi4uLi4uLi4uICovXHJcbmV4cG9ydCBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFja2Ryb3BcIik7XHJcbmV4cG9ydCBjb25zdCBzaWRlbmF2V3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lkZW5hdldyYXBwZXJcIik7XHJcbmV4cG9ydCBjb25zdCBzaWRlZHJhd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWRlZHJhd2VyXCIpO1xyXG5leHBvcnQgY29uc3QgbG9naW5CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luQnRuXCIpO1xyXG5leHBvcnQgY29uc3QgY3JlYXRlQWNjb3VudEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlYXRlQWNjb3VudEJ0blwiKTtcclxuZXhwb3J0IGNvbnN0IGZvb2QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvb2RcIik7XHJcbmV4cG9ydCBjb25zdCBmb29kQ2FydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9vZENhcnRcIik7XHJcbmV4cG9ydCBjb25zdCBpbWFnZUZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbGVcIik7XHJcbmV4cG9ydCBsZXQgaW1hZ2VPdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKTtcclxuZXhwb3J0IGNvbnN0IGVkaXQxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0MVwiKTtcclxuZXhwb3J0IGNvbnN0IGVkaXQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0MlwiKTtcclxuZXhwb3J0IGNvbnN0IHJtMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm0yXCIpO1xyXG5leHBvcnQgY29uc3Qgcm0xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJybTFcIik7XHJcbmV4cG9ydCBjb25zdCBjbG9zZVVwZGF0ZUZvb2RJdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZVVwZGF0ZUZvb2RJdGVtXCIpO1xyXG5leHBvcnQgY29uc3QgY2xvc2VEZWxldGVGb29kSXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VEZWxldGVGb29kSXRlbVwiKTtcclxuZXhwb3J0IGNvbnN0IG9yZGVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcmRlckJ0blwiKTtcclxuZXhwb3J0IGNvbnN0IG9yZGVyQnRuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3JkZXJCdG4yXCIpO1xyXG5leHBvcnQgY29uc3QgY2xvc2VMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VMb2NhdGlvbkZvcm0nKTtcclxuZXhwb3J0IGNvbnN0IGNsb3NlTG9jYXRpb25Gb3JtMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZUxvY2F0aW9uRm9ybTInKTtcclxuZXhwb3J0IGNvbnN0IGNhcnRDbGlwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcnRDbGlwJyk7XHJcbmV4cG9ydCBjb25zdCBjYXRlZ29yeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXRlZ29yeScpO1xyXG5leHBvcnQgY29uc3QgY2F0ZWdvcnlMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhdGVnb3J5TGlzdCcpO1xyXG5leHBvcnQgY29uc3QgY2xvc2VPcmRlckRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VPcmRlckRldGFpbHMnKTtcclxuZXhwb3J0IGNvbnN0IG15Q2FydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUNhcnQnKTtcclxuZXhwb3J0IGNvbnN0IGZvb2RJdGVtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb2RJdGVtQ29udGFpbmVyJyk7XHJcbmV4cG9ydCBjb25zdCBidXJnZXIxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXJnZXIxXCIpOyIsImV4cG9ydCBjb25zdCBzaG93TW9kYWwgPSAoaWQsIG1vZGFsQmxvY2spID0+IHtcclxuICAgIHN3aXRjaCAobW9kYWxCbG9jaykge1xyXG4gICAgICBcclxuICAgICAgY2FzZSAnZGVsZXRlRm9vZEl0ZW1Db250ZW50JzpcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBkYXRlRm9vZEl0ZW1Db250ZW50Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBjb25zdCBkZWxldGVGb29kSXRlbUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVsZXRlRm9vZEl0ZW1Db250ZW50Jyk7XHJcbiAgICAgICAgaWYgKGRlbGV0ZUZvb2RJdGVtQ29udGVudC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgZGVsZXRlRm9vZEl0ZW1Db250ZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2xvY2F0aW9uRm9ybSc6XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbkZvcm0nKTtcclxuICAgICAgICBpZiAobG9jYXRpb25Gb3JtLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xyXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvY2F0aW9uRm9ybScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2NhcnQnOlxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbkZvcm0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGNvbnN0IGNhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydCcpO1xyXG4gICAgICAgIGlmIChjYXJ0LnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcnRcIikuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnb3JkZXJEZXRhaWwnOlxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IG9yZGVyRGV0YWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29yZGVyRGV0YWlsJyk7XHJcbiAgICAgICAgaWYgKG9yZGVyRGV0YWlsLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29yZGVyRGV0YWlsXCIpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwZGF0ZUZvb2RJdGVtQ29udGVudCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZWxldGVGb29kSXRlbUNvbnRlbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIH1cclxuICBcclxuICB9O1xyXG4gIFxyXG4gIGV4cG9ydCBjb25zdCBjbG9zZU1vZGFsID0gKGlkKSA9PiB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICB9O1xyXG4gICIsImV4cG9ydCBjb25zdCBvcGVubmF2ID0gKCkgPT4ge1xyXG4gIC8vIGNvbnNvbGUubG9nKCdzaWRlZHJhd2VyIGlzIGNsaWNrZWQnKTtcclxuICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICBzaWRlbmF2V3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgwJSknO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNsb3NlbmF2ID0gKCkgPT4ge1xyXG5cclxuICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIHNpZGVuYXZXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0xMDAlKSc7XHJcblxyXG59OyIsImNvbnN0IHRoU24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoLXNuXCIpO1xyXG5jb25zdCB0aEN1c3RvbWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aC1jdXN0b21lck5hbWVcIik7XHJcbmNvbnN0IHRoRGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoLWRlc2NyaXB0aW9uXCIpO1xyXG5jb25zdCB0aFRpbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoLXRpbWVcIik7XHJcbmNvbnN0IHRoRGVsaXZlcnlUaW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aC1kZWxpdmVyeVRpbWVcIik7XHJcbmNvbnN0IHRoUHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoLXByaWNlXCIpO1xyXG5jb25zdCB0aEFjdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoLWFjdGlvbnNcIik7XHJcbmNvbnN0IHRoQ29tcGxldGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoLWNvbXBsZXRlXCIpO1xyXG5jb25zdCB0aFBpY3R1cmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoLXBpY3R1cmVcIik7XHJcbmNvbnN0IHRoT3JkZXJEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aC1vcmRlckRhdGVcIik7XHJcbmNvbnN0IHRoT3JkZXJUaW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aC1vcmRlclRpbWVcIik7XHJcbmNvbnN0IHRoT3JkZXJRdWFudGl0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGgtcXVhbnRpdHlcIik7XHJcbmNvbnN0IHRoQW1vdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aC1hbW91bnRcIik7XHJcbmNvbnN0IHRoU3RhdHVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aC1zdGF0dXNcIik7XHJcbmNvbnN0IGN1c3RvbWVyT3JkZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXN0b21lck9yZGVyc1wiKTtcclxuY29uc3QgdXNlck9yZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyT3JkZXJcIik7XHJcblxyXG5cclxuY29uc3QgaFNuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoLXNuXCIpO1xyXG5jb25zdCBoQ3VzdG9tZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImgtY3VzdG9tZXJOYW1lXCIpO1xyXG5jb25zdCBoRGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImgtZGVzY3JpcHRpb25cIik7XHJcbmNvbnN0IGhUaW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoLW9yZGVyVGltZVwiKTtcclxuY29uc3QgaERlbGl2ZXJ5VGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1kZWxpdmVyeVRpbWVcIik7XHJcbmNvbnN0IGhQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1wcmljZVwiKTtcclxuY29uc3QgaEFjdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImgtYWN0aW9uc1wiKTtcclxuY29uc3QgaENvbXBsZXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoLWNvbXBsZXRlXCIpO1xyXG5cclxuY29uc3Qgc2Nyb2xsQmxvY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjcm9sbEJsb2NrXCIpO1xyXG5cclxuZnVuY3Rpb24gcmVzQ29sKCl7XHJcbiAgICBjb25zdCBzZXJpYWxOb0NvbCA9IHRoU24uZ2V0Q2xpZW50UmVjdHMoKVswXS53aWR0aDtcclxuICAgIGNvbnN0IGN1c3RvbWVyQ29sID0gdGhDdXN0b21lci5nZXRDbGllbnRSZWN0cygpWzBdLndpZHRoO1xyXG4gICAgY29uc3QgdGltZUNvbCA9IHRoVGltZS5nZXRDbGllbnRSZWN0cygpWzBdLndpZHRoO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb25Db2wgPSB0aERlc2NyaXB0aW9uLmdldENsaWVudFJlY3RzKClbMF0ud2lkdGg7XHJcbiAgICBjb25zdCBkZWxpdmVyeVRpbWUgPSB0aERlbGl2ZXJ5VGltZS5nZXRDbGllbnRSZWN0cygpWzBdLndpZHRoO1xyXG4gICAgY29uc3QgcHJpY2VDb2wgPSB0aFByaWNlLmdldENsaWVudFJlY3RzKClbMF0ud2lkdGg7XHJcbiAgICBjb25zdCBhY3Rpb25zQ29sID0gdGhBY3Rpb25zLmdldENsaWVudFJlY3RzKClbMF0ud2lkdGg7XHJcbiAgICBjb25zdCBjb21wbGV0ZUNvbCA9IHRoQ29tcGxldGUuZ2V0Q2xpZW50UmVjdHMoKVswXS53aWR0aDtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1zblwiKS5zdHlsZS53aWR0aCA9IChzZXJpYWxOb0NvbC0xMCkudG9TdHJpbmcoKS5jb25jYXQoXCJweFwiKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1jdXN0b21lck5hbWVcIikuc3R5bGUud2lkdGggPSAoY3VzdG9tZXJDb2wtMTAuOSkudG9TdHJpbmcoKS5jb25jYXQoXCJweFwiKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1kZXNjcmlwdGlvblwiKS5zdHlsZS53aWR0aCA9IChkZXNjcmlwdGlvbkNvbC0xMC45KS50b1N0cmluZygpLmNvbmNhdChcInB4XCIpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoLW9yZGVyVGltZVwiKS5zdHlsZS53aWR0aCA9ICh0aW1lQ29sLTEwLjkpLnRvU3RyaW5nKCkuY29uY2F0KFwicHhcIik7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImgtZGVsaXZlcnlUaW1lXCIpLnN0eWxlLndpZHRoID0gKGRlbGl2ZXJ5VGltZS0xMC45KS50b1N0cmluZygpLmNvbmNhdChcInB4XCIpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoLXByaWNlXCIpLnN0eWxlLndpZHRoID0gKHByaWNlQ29sLTEwLjkpLnRvU3RyaW5nKCkuY29uY2F0KFwicHhcIik7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImgtYWN0aW9uc1wiKS5zdHlsZS53aWR0aCA9IChhY3Rpb25zQ29sIC0gMTAuOSkudG9TdHJpbmcoKS5jb25jYXQoXCJweFwiKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1jb21wbGV0ZVwiKS5zdHlsZS53aWR0aCA9ICggY29tcGxldGVDb2wtMTAuOSkudG9TdHJpbmcoKS5jb25jYXQoXCJweFwiKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHJlc0NvbDIoKXtcclxuICAgIGNvbnN0IHNlcmlhbE5vQ29sID0gdGhTbi5nZXRDbGllbnRSZWN0cygpWzBdLndpZHRoO1xyXG4gICAgY29uc3QgcGljdHVyZUNvbCA9IHRoUGljdHVyZS5nZXRDbGllbnRSZWN0cygpWzBdLndpZHRoO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb25Db2wgPSB0aERlc2NyaXB0aW9uLmdldENsaWVudFJlY3RzKClbMF0ud2lkdGg7XHJcbiAgICBjb25zdCBkYXRlQ29sID0gdGhPcmRlckRhdGUuZ2V0Q2xpZW50UmVjdHMoKVswXS53aWR0aDtcclxuICAgIGNvbnN0IHRpbWVDb2wgPSB0aE9yZGVyVGltZS5nZXRDbGllbnRSZWN0cygpWzBdLndpZHRoO1xyXG4gICAgY29uc3QgcXVhbnRpdHlDb2wgPSB0aE9yZGVyUXVhbnRpdHkuZ2V0Q2xpZW50UmVjdHMoKVswXS53aWR0aDtcclxuICAgIGNvbnN0IGFtb3VudENvbCA9IHRoQW1vdW50LmdldENsaWVudFJlY3RzKClbMF0ud2lkdGg7XHJcbiAgICBjb25zdCBzdGF0dXNDb2wgPSB0aFN0YXR1cy5nZXRDbGllbnRSZWN0cygpWzBdLndpZHRoO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoLXNuXCIpLnN0eWxlLndpZHRoID0gKHNlcmlhbE5vQ29sLTEwLjkpLnRvU3RyaW5nKCkuY29uY2F0KFwicHhcIik7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImgtcGljdHVyZVwiKS5zdHlsZS53aWR0aCA9IChwaWN0dXJlQ29sLTEwLjkpLnRvU3RyaW5nKCkuY29uY2F0KFwicHhcIik7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImgtZGVzY3JpcHRpb25cIikuc3R5bGUud2lkdGggPSAoZGVzY3JpcHRpb25Db2wtMTAuOSkudG9TdHJpbmcoKS5jb25jYXQoXCJweFwiKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1vcmRlckRhdGVcIikuc3R5bGUud2lkdGggPSAoZGF0ZUNvbC0gMTAuOSkudG9TdHJpbmcoKS5jb25jYXQoXCJweFwiKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1vcmRlclRpbWVcIikuc3R5bGUud2lkdGggPSAodGltZUNvbC0xMC45KS50b1N0cmluZygpLmNvbmNhdChcInB4XCIpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoLXF1YW50aXR5XCIpLnN0eWxlLndpZHRoID0gKHF1YW50aXR5Q29sLTEwLjkpLnRvU3RyaW5nKCkuY29uY2F0KFwicHhcIik7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImgtYW1vdW50XCIpLnN0eWxlLndpZHRoID0gKGFtb3VudENvbCAtIDEwLjkpLnRvU3RyaW5nKCkuY29uY2F0KFwicHhcIik7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImgtc3RhdHVzXCIpLnN0eWxlLndpZHRoID0gKCBzdGF0dXNDb2wtMTAuOSkudG9TdHJpbmcoKS5jb25jYXQoXCJweFwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheVRhYmxlSGVhZGVyKCkge1xyXG4gICAgY29uc3Qgc2Nyb2xsQmxvY2tUb3AgPSBzY3JvbGxCbG9jay5zY3JvbGxUb3A7XHJcbiAgICBpZihzY3JvbGxCbG9ja1RvcCA+IDAgJiYgd2luZG93LnZpc3VhbFZpZXdwb3J0LndpZHRoID4gNzAwICl7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YWJsZUhlYWRlclwiKS5zdHlsZS5kaXNwbGF5PVwiZmxleFwiO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHNjcm9sbEJsb2NrVG9wID09PSAwICl7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YWJsZUhlYWRlclwiKS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBHZXQgYWxsIGVsZW1lbnRzIHdpdGggY2xhc3M9XCJjbG9zZWJ0blwiXHJcbnZhciBjbG9zZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjbG9zZWJ0blwiKTtcclxudmFyIGk7XHJcblxyXG4vLyBMb29wIHRocm91Z2ggYWxsIGNsb3NlIGJ1dHRvbnNcclxuZm9yIChpID0gMDsgaSA8IGNsb3NlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAvLyBXaGVuIHNvbWVvbmUgY2xpY2tzIG9uIGEgY2xvc2UgYnV0dG9uXHJcbiAgICBjbG9zZVtpXS5vbmNsaWNrID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBwYXJlbnQgb2YgPHNwYW4gY2xhc3M9XCJjbG9zZWJ0blwiPiAoPGRpdiBjbGFzcz1cImFsZXJ0XCI+KVxyXG4gICAgICAgIHZhciBkaXYgPSB0aGlzLnBhcmVudEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIFNldCB0aGUgb3BhY2l0eSBvZiBkaXYgdG8gMCAodHJhbnNwYXJlbnQpXHJcbiAgICAgICAgZGl2LnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuXHJcbiAgICAgICAgLy8gSGlkZSB0aGUgZGl2IGFmdGVyIDYwMG1zICh0aGUgc2FtZSBhbW91bnQgb2YgbWlsbGlzZWNvbmRzIGl0IHRha2VzIHRvIGZhZGUgb3V0KVxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgZGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjsgfSwgNjAwKTtcclxuICAgIH1cclxufVxyXG5cclxuaWYgKGN1c3RvbWVyT3JkZXJzKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHJlc0NvbCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzQ29sKTtcclxuICAgIHNjcm9sbEJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGRpc3BsYXlUYWJsZUhlYWRlcik7XHJcbiAgICBzY3JvbGxCbG9jay5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCByZXNDb2wpO1xyXG4gICAgY29uc3Qgb3JkZXIxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCIxXCIpO1xyXG4gICAgaWYob3JkZXIxKXtcclxuICAgICAgICBvcmRlcjEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzaG93TW9kYWwoJ21vZGFsJykpO1xyXG4gICAgfVxyXG4gICBcclxufTtcclxuXHJcbmNvbnN0IHNob3dNb2RhbCA9IChpZCkgPT4ge1xyXG5cdHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxufTtcclxuXHJcbmNvbnN0IGNsb3NlTW9kYWwgPSAoaWQpID0+IHtcclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG59XHJcblxyXG5pZiAodXNlck9yZGVyKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHJlc0NvbDIpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc0NvbDIpO1xyXG4gICAgc2Nyb2xsQmxvY2suYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZGlzcGxheVRhYmxlSGVhZGVyKTtcclxuICAgIHNjcm9sbEJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHJlc0NvbDIpO1xyXG59XHJcblxyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgJy4vaW5kZXguY3NzJztcclxuaW1wb3J0IHtcclxuICAgIHNpZGVkcmF3ZXIsXHJcbiAgICBiYWNrZHJvcCxcclxuICAgIHNpZGVuYXZXcmFwcGVyLFxyXG4gICAgY3JlYXRlQWNjb3VudEJ0bixcclxuICAgIGxvZ2luQnRuLFxyXG4gICAgZm9vZCxcclxuICAgIGZvb2RDYXJ0LFxyXG4gICAgaW1hZ2VGaWxlLFxyXG4gICAgaW1hZ2VPdXRwdXQsXHJcbiAgICBlZGl0MSxcclxuICAgIGVkaXQyLFxyXG4gICAgcm0xLFxyXG4gICAgcm0yLFxyXG4gICAgY2xvc2VVcGRhdGVGb29kSXRlbSxcclxuICAgIGNsb3NlRGVsZXRlRm9vZEl0ZW0sXHJcbiAgICBvcmRlckJ0bixcclxuICAgIG9yZGVyQnRuMixcclxuICAgIGNsb3NlTG9jYXRpb25Gb3JtLFxyXG4gICAgY2xvc2VMb2NhdGlvbkZvcm0yLFxyXG4gICAgY2FydENsaXAsXHJcbiAgICBjYXRlZ29yeSxcclxuICAgIGNhdGVnb3J5TGlzdCxcclxuICAgIGNsb3NlT3JkZXJEZXRhaWxzLFxyXG4gICAgbXlDYXJ0LFxyXG4gICAgZm9vZEl0ZW1Db250YWluZXIsXHJcbiAgICBidXJnZXIxLFxyXG4gIH0gZnJvbSAnLi9hc3NldHMvanMvZ2xvYmFscyc7XHJcbiAgaW1wb3J0IHsgb3Blbm5hdiwgY2xvc2VuYXYgfSBmcm9tICcuL2Fzc2V0cy9qcy9zaWRlbmF2JztcclxuICBpbXBvcnQge1xyXG4gICAgc2hvd01vZGFsLFxyXG4gICAgY2xvc2VNb2RhbCxcclxuICB9IGZyb20gJy4vYXNzZXRzL2pzL21vZGFsJztcclxuICBpbXBvcnQgJy4vYXNzZXRzL2pzL3RhYmxlJztcclxuICBcclxuICBpZiAoc2lkZWRyYXdlcikge1xyXG4gICAgc2lkZWRyYXdlci5vbmNsaWNrID0gKCkgPT4gb3Blbm5hdigpO1xyXG4gIH1cclxuICBcclxuICBpZiAoYmFja2Ryb3ApIHtcclxuICAgIGJhY2tkcm9wLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGNsb3NlbmF2KCk7XHJcbiAgICAgIGlmKGNhdGVnb3J5TGlzdCl7XHJcbiAgICAgICAgY2F0ZWdvcnlMaXN0LmNsYXNzTGlzdC5hZGQoXCItc2lkZW5hdi1mb29kLW5hdmlnYXRpb24tLWlzSGlkZGVuXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKGNyZWF0ZUFjY291bnRCdG4pIHtcclxuICAgIGNyZWF0ZUFjY291bnRCdG4ub25jbGljayA9ICgpID0+IHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuL3VzZXIuaHRtbFwiO1xyXG4gIH1cclxuXHJcbiAgaWYgKGxvZ2luQnRuKSB7XHJcbiAgICBsb2dpbkJ0bi5vbmNsaWNrID0gKCkgPT4gd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi4vdXNlci5odG1sXCI7XHJcbiAgfVxyXG5cclxuICBpZihmb29kIHx8IGZvb2RDYXJ0KXtcclxuICAgIFxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+e1xyXG4gICAgICBsZXQgZm9vZENsaWVudFJlY3RZID0gZm9vZC5nZXRDbGllbnRSZWN0cygpWzBdLnlcclxuICAgICAgaWYgKCB3aW5kb3cuc2Nyb2xsWSA+PSAzNzApe1xyXG5cclxuICAgICAgICBmb29kLmNsYXNzTGlzdC5hZGQoJ2Zvb2ROYXZXcmFwcGVyLW9uV2luZG93U2Nyb2xsJyk7XHJcbiAgICAgICAgZm9vZEl0ZW1Db250YWluZXIuY2xhc3NMaXN0LmFkZChcIi1vZmZzZXQtbC0yeFwiKTtcclxuICAgICAgIFxyXG4gICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgZm9vZC5jbGFzc0xpc3QucmVtb3ZlKCdmb29kTmF2V3JhcHBlci1vbldpbmRvd1Njcm9sbCcpO1xyXG4gICAgICAgIGZvb2RJdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCItb2Zmc2V0LWwtMnhcIik7XHJcbiAgXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICggd2luZG93LnNjcm9sbFkgPj0gNDApe1xyXG5cclxuICAgICAgICBmb29kQ2FydC5jbGFzc0xpc3QuYWRkKCdmb29kQ2FydC1vbldpbmRvd1Njcm9sbCcpO1xyXG4gICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgZm9vZENhcnQuY2xhc3NMaXN0LnJlbW92ZSgnZm9vZENhcnQtb25XaW5kb3dTY3JvbGwnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCB3aW5kb3cuc2Nyb2xsWSA+PSAzNzUpe1xyXG4gICAgICAgIGNhcnRDbGlwLmNsYXNzTGlzdC5hZGQoJ2NhcnRDbGlwLW9uV2luZG93U2Nyb2xsJyk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICBcclxuICAgICAgICBjYXJ0Q2xpcC5jbGFzc0xpc3QucmVtb3ZlKCdjYXJ0Q2xpcC1vbldpbmRvd1Njcm9sbCcpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfSkgIFxyXG4gIH1cclxuXHJcbiAgaWYoaW1hZ2VGaWxlKXtcclxuICAgIGltYWdlRmlsZS5vbmNoYW5nZSA9IChldmVudCkgPT57XHJcblxyXG4gICAgICBpbWFnZU91dHB1dC5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGV2ZW50LnRhcmdldC5maWxlc1swXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuaWYoZWRpdDEpe1xyXG4gIGVkaXQxLm9uY2xpY2sgPSAoKSA9PiBzaG93TW9kYWwoJ21vZGFsJywgJ3VwZGF0ZUZvb2RJdGVtQ29udGVudCcpXHJcbn1cclxuXHJcbmlmKGVkaXQyKXtcclxuICBlZGl0Mi5vbmNsaWNrID0gKCkgPT4gc2hvd01vZGFsKCdtb2RhbCcsICd1cGRhdGVGb29kSXRlbUNvbnRlbnQnKVxyXG59XHJcblxyXG5pZihjbG9zZVVwZGF0ZUZvb2RJdGVtKXtcclxuICBjbG9zZVVwZGF0ZUZvb2RJdGVtLm9uY2xpY2sgPSAoKSA9PiBjbG9zZU1vZGFsKCdtb2RhbCcpO1xyXG59XHJcblxyXG5pZihybTEpe1xyXG4gIHJtMS5vbmNsaWNrID0gKCkgPT4gIHNob3dNb2RhbCgnbW9kYWwnLCAnZGVsZXRlRm9vZEl0ZW1Db250ZW50JylcclxufVxyXG5cclxuaWYocm0yKXtcclxuICBybTIub25jbGljayA9ICgpID0+ICBzaG93TW9kYWwoJ21vZGFsJywgJ2RlbGV0ZUZvb2RJdGVtQ29udGVudCcpXHJcbn1cclxuXHJcblxyXG5pZihjbG9zZURlbGV0ZUZvb2RJdGVtKXtcclxuICBjbG9zZURlbGV0ZUZvb2RJdGVtLm9uY2xpY2sgPSAoKSA9PiBjbG9zZU1vZGFsKCdtb2RhbCcpO1xyXG59XHJcblxyXG5pZihvcmRlckJ0bil7XHJcbiAgXHJcbiAgb3JkZXJCdG4ub25jbGljayA9ICgpID0+IHNob3dNb2RhbCgnbW9kYWwnLCAnbG9jYXRpb25Gb3JtJyk7XHJcbn1cclxuXHJcbmlmKG9yZGVyQnRuMil7XHJcbiAgb3JkZXJCdG4yLm9uY2xpY2sgPSAoKSA9PiBzaG93TW9kYWwoJ21vZGFsJywgJ2xvY2F0aW9uRm9ybScpO1xyXG59XHJcblxyXG5pZiAoY2xvc2VMb2NhdGlvbkZvcm0pIHtcclxuXHJcbiAgY2xvc2VMb2NhdGlvbkZvcm0ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNsb3NlTW9kYWwoJ21vZGFsJyk7XHJcbiAgfTtcclxufVxyXG5cclxuaWYgKGNsb3NlTG9jYXRpb25Gb3JtMikge1xyXG5cclxuICBjbG9zZUxvY2F0aW9uRm9ybTIub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNsb3NlTW9kYWwoJ21vZGFsJyk7XHJcbiAgfTtcclxufVxyXG5cclxuaWYoY2FydENsaXApe1xyXG4gIGNhcnRDbGlwLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBzaG93TW9kYWwoJ21vZGFsJywgJ2NhcnQnKTtcclxuICB9XHJcbn1cclxuXHJcbmlmKGNhdGVnb3J5KXtcclxuICBjYXRlZ29yeS5vbmNsaWNrPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYXRlZ29yeUxpc3QuY2xhc3NMaXN0LnJlbW92ZShcIi1zaWRlbmF2LWZvb2QtbmF2aWdhdGlvbi0taXNIaWRkZW5cIik7XHJcbiAgfVxyXG5cclxuICBjYXRlZ29yeS5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNhdGVnb3J5TGlzdC5jbGFzc0xpc3QuYWRkKFwiLXNpZGVuYXYtZm9vZC1uYXZpZ2F0aW9uLS1pc0hpZGRlblwiKTtcclxuICB9XHJcblxyXG4gIGNhdGVnb3J5TGlzdC5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY2F0ZWdvcnlMaXN0LmNsYXNzTGlzdC5hZGQoXCItc2lkZW5hdi1mb29kLW5hdmlnYXRpb24tLWlzSGlkZGVuXCIpO1xyXG4gIH1cclxufVxyXG5cclxuaWYoY2xvc2VPcmRlckRldGFpbHMpe1xyXG4gIGNsb3NlT3JkZXJEZXRhaWxzLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjbG9zZU1vZGFsKCdtb2RhbCcpXHJcbiAgfVxyXG59XHJcbmxldCB2aWV3Q2FydCA9IHRydWU7XHJcbmlmKG15Q2FydCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDkwMCl7XHJcbiAgXHJcbiAgXHJcbiAgbXlDYXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgY29uc29sZS5sb2coJ215Y2FydCcpXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYodmlld0NhcnQpe1xyXG4gICAgICBmb29kQ2FydC5jbGFzc0xpc3QucmVtb3ZlKCdmb29kQ2FydC1pc0hpZGRlbicpO1xyXG4gICAgICBmb29kQ2FydC5jbGFzc0xpc3QuYWRkKCdmb29kQ2FydC1pc1Zpc2libGUnKTtcclxuICAgICAgZm9vZEl0ZW1Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnLWNvbC1sLTknKTtcclxuICAgICAgZm9vZEl0ZW1Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnLWNvbC1sLTgnKTtcclxuICAgICAgdmlld0NhcnQgPSBmYWxzZTtcclxuICAgIH1lbHNle1xyXG4gICAgICBcclxuICAgICAgZm9vZENhcnQuY2xhc3NMaXN0LmFkZCgnZm9vZENhcnQtaXNIaWRkZW4nKTtcclxuICAgICAgZm9vZENhcnQuY2xhc3NMaXN0LnJlbW92ZSgnZm9vZENhcnQtaXNWaXNpYmxlJyk7XHJcbiAgICAgIGZvb2RJdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJy1jb2wtbC05Jyk7XHJcbiAgICAgIGZvb2RJdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJy1jb2wtbC04Jyk7XHJcbiAgICAgIHZpZXdDYXJ0ID0gdHJ1ZTtcclxuICAgIH1cclxuICB9KVxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKT0+e1xyXG4gICAgZm9vZENhcnQuY2xhc3NMaXN0LmFkZCgnaGlkZS1vbi1tZWRpdW0tYW5kLWRvd24nKTtcclxuICAgIGZvb2RDYXJ0LmNsYXNzTGlzdC5hZGQoJ2Zvb2RDYXJ0LWlzSGlkZGVuJyk7XHJcbiAgICBmb29kQ2FydC5jbGFzc0xpc3QucmVtb3ZlKCdmb29kQ2FydC1pc1Zpc2libGUnKTtcclxuICAgIGZvb2RJdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJy1jb2wtbC04Jyk7XHJcbiAgICBmb29kSXRlbUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCctY29sLWwtOScpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5pZihidXJnZXIxICYmIHdpbmRvdy5pbm5lcldpZHRoID4gOTAwKXtcclxuICBidXJnZXIxLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICBmb29kQ2FydC5jbGFzc0xpc3QucmVtb3ZlKCdmb29kQ2FydC1pc0hpZGRlbicpO1xyXG4gICAgICBmb29kQ2FydC5jbGFzc0xpc3QuYWRkKCdmb29kQ2FydC1pc1Zpc2libGUnKTtcclxuICAgICAgZm9vZEl0ZW1Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnLWNvbC1sLTknKTtcclxuICAgICAgZm9vZEl0ZW1Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnLWNvbC1sLTgnKTtcclxuICAgICAgdmlld0NhcnQgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=