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
/******/ 	var hotCurrentHash = "dcb7777a20c77f4cf124";
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
/*! exports provided: backdrop, sidenavWrapper, sidedrawer, loginBtn, createAccountBtn, food, foodCart, imageFile, imageOutput, edit1, edit2, rm2, rm1, closeUpdateFoodItem, closeDeleteFoodItem, orderBtn, orderBtn2, closeLocationForm, closeLocationForm2, cartClip, category, categoryList, closeOrderDetails, myCart, foodItemContainer, burger1, closeFoodVariants, headerPane */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeFoodVariants", function() { return closeFoodVariants; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerPane", function() { return headerPane; });
/* .......Side navigation nodes............ */
var backdrop = document.getElementById('backdrop');
var sidenavWrapper = document.getElementById('sidenavWrapper');
var sidedrawer = document.getElementById('sidedrawer');
var loginBtn = document.getElementById('loginBtn');
var createAccountBtn = document.getElementById('createAccountBtn');
var food = document.getElementById('food');
var foodCart = document.getElementById('foodCart');
var imageFile = document.getElementById('file');
var imageOutput = document.getElementById('output');
var edit1 = document.getElementById('edit1');
var edit2 = document.getElementById('edit2');
var rm2 = document.getElementById('rm2');
var rm1 = document.getElementById('rm1');
var closeUpdateFoodItem = document.getElementById('closeUpdateFoodItem');
var closeDeleteFoodItem = document.getElementById('closeDeleteFoodItem');
var orderBtn = document.getElementById('orderBtn');
var orderBtn2 = document.getElementById('orderBtn2');
var closeLocationForm = document.getElementById('closeLocationForm');
var closeLocationForm2 = document.getElementById('closeLocationForm2');
var cartClip = document.getElementById('cartClip');
var category = document.getElementById('category');
var categoryList = document.getElementById('categoryList');
var closeOrderDetails = document.getElementById('closeOrderDetails');
var myCart = document.getElementById('myCart');
var foodItemContainer = document.getElementById('foodItemContainer');
var burger1 = document.getElementById('burger1');
var closeFoodVariants = document.getElementById('closeFoodVariants');
var headerPane = document.getElementById('header-pane');

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
      document.querySelector('#foodVariants').style.display = 'none';
      var locationForm = document.querySelector('#locationForm');

      if (locationForm.style.display === 'none') {
        document.querySelector('#locationForm').style.display = 'block';
      }

      document.getElementById(id).style.display = 'block';
      break;

    case 'foodVariants':
      document.querySelector('#cart').style.display = 'none';
      document.querySelector('#locationForm ').style.display = 'none';
      var foodVariants = document.querySelector('#foodVariants');

      if (foodVariants.style.display === 'none') {
        document.querySelector('#foodVariants').style.display = 'block';
      }

      document.getElementById(id).style.display = 'block';
      break;

    case 'cart':
      document.querySelector('#locationForm').style.display = 'none';
      document.querySelector('#foodVariants').style.display = 'none';
      var cart = document.querySelector('#cart');

      if (cart.style.display === 'none') {
        document.querySelector('#cart').style.display = 'block';
      }

      document.getElementById(id).style.display = 'block';
      break;

    case 'orderDetail':
      var orderDetail = document.querySelector('#orderDetail');

      if (orderDetail.style.display === 'none') {
        document.querySelector('#orderDetail').style.display = 'block';
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
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["categoryList"].classList.add('-sidenav-food-navigation--isHidden');
    }
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["createAccountBtn"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["createAccountBtn"].onclick = function () {
    return window.location.href = './user.html';
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["loginBtn"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["loginBtn"].onclick = function () {
    return window.location.href = './user.html';
  };
}

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["food"] || _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodCart"]) {
  window.addEventListener('scroll', function () {
    if (window.scrollY >= 370 && window.innerWidth > 991) {
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["food"].classList.add('foodNavWrapper-onWindowScroll');
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodItemContainer"].classList.add('-offset-l-2x');
    } else if (window.scrollY < 370 && window.innerWidth > 991) {
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["food"].classList.remove('foodNavWrapper-onWindowScroll');
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodItemContainer"].classList.remove('-offset-l-2x');
    } else if (window.scrollY >= 370 && window.innerWidth < 991 && window.innerWidth > 600) {
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["food"].classList.add('foodNavWrapper-onWindowScroll');
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodItemContainer"].classList.add('-offset-m-3x');
    } else if (window.scrollY < 360 && window.innerWidth < 991) {
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["food"].classList.remove('foodNavWrapper-onWindowScroll');
      _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["foodItemContainer"].classList.remove('-offset-m-3x');
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

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["closeFoodVariants"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["closeFoodVariants"].onclick = function () {
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
    _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["categoryList"].classList.remove('-sidenav-food-navigation--isHidden');
  };

  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["category"].onmouseover = function () {
    _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["categoryList"].classList.add('-sidenav-food-navigation--isHidden');
  };

  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["categoryList"].onclick = function () {
    _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["categoryList"].classList.add('-sidenav-food-navigation--isHidden');
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

if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["burger1"]) {
  _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["burger1"].onclick = function () {
    Object(_assets_js_modal__WEBPACK_IMPORTED_MODULE_3__["showModal"])('modal', 'foodVariants');
  };
}

if (closeF) {
  if (_assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["headerPane"]) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["headerPane"].classList.remove('header');
        _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["headerPane"].classList.add('header-with-fixed-position');
      } else if (window.scrollY < 40) {
        _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["headerPane"].classList.remove('header-with-fixed-position');
        _assets_js_globals__WEBPACK_IMPORTED_MODULE_1__["headerPane"].classList.add('header');
      }
    });
  }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2dsb2JhbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL21vZGFsLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9zaWRlbmF2LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiXSwibmFtZXMiOlsiYmFja2Ryb3AiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2lkZW5hdldyYXBwZXIiLCJzaWRlZHJhd2VyIiwibG9naW5CdG4iLCJjcmVhdGVBY2NvdW50QnRuIiwiZm9vZCIsImZvb2RDYXJ0IiwiaW1hZ2VGaWxlIiwiaW1hZ2VPdXRwdXQiLCJlZGl0MSIsImVkaXQyIiwicm0yIiwicm0xIiwiY2xvc2VVcGRhdGVGb29kSXRlbSIsImNsb3NlRGVsZXRlRm9vZEl0ZW0iLCJvcmRlckJ0biIsIm9yZGVyQnRuMiIsImNsb3NlTG9jYXRpb25Gb3JtIiwiY2xvc2VMb2NhdGlvbkZvcm0yIiwiY2FydENsaXAiLCJjYXRlZ29yeSIsImNhdGVnb3J5TGlzdCIsImNsb3NlT3JkZXJEZXRhaWxzIiwibXlDYXJ0IiwiZm9vZEl0ZW1Db250YWluZXIiLCJidXJnZXIxIiwiY2xvc2VGb29kVmFyaWFudHMiLCJoZWFkZXJQYW5lIiwic2hvd01vZGFsIiwiaWQiLCJtb2RhbEJsb2NrIiwicXVlcnlTZWxlY3RvciIsInN0eWxlIiwiZGlzcGxheSIsImRlbGV0ZUZvb2RJdGVtQ29udGVudCIsImxvY2F0aW9uRm9ybSIsImZvb2RWYXJpYW50cyIsImNhcnQiLCJvcmRlckRldGFpbCIsImNsb3NlTW9kYWwiLCJvcGVubmF2IiwidHJhbnNmb3JtIiwiY2xvc2VuYXYiLCJ0aFNuIiwidGhDdXN0b21lciIsInRoRGVzY3JpcHRpb24iLCJ0aFRpbWUiLCJ0aERlbGl2ZXJ5VGltZSIsInRoUHJpY2UiLCJ0aEFjdGlvbnMiLCJ0aENvbXBsZXRlIiwidGhQaWN0dXJlIiwidGhPcmRlckRhdGUiLCJ0aE9yZGVyVGltZSIsInRoT3JkZXJRdWFudGl0eSIsInRoQW1vdW50IiwidGhTdGF0dXMiLCJjdXN0b21lck9yZGVycyIsInVzZXJPcmRlciIsImhTbiIsImhDdXN0b21lciIsImhEZXNjcmlwdGlvbiIsImhUaW1lIiwiaERlbGl2ZXJ5VGltZSIsImhQcmljZSIsImhBY3Rpb25zIiwiaENvbXBsZXRlIiwic2Nyb2xsQmxvY2siLCJyZXNDb2wiLCJzZXJpYWxOb0NvbCIsImdldENsaWVudFJlY3RzIiwid2lkdGgiLCJjdXN0b21lckNvbCIsInRpbWVDb2wiLCJkZXNjcmlwdGlvbkNvbCIsImRlbGl2ZXJ5VGltZSIsInByaWNlQ29sIiwiYWN0aW9uc0NvbCIsImNvbXBsZXRlQ29sIiwidG9TdHJpbmciLCJjb25jYXQiLCJyZXNDb2wyIiwicGljdHVyZUNvbCIsImRhdGVDb2wiLCJxdWFudGl0eUNvbCIsImFtb3VudENvbCIsInN0YXR1c0NvbCIsImRpc3BsYXlUYWJsZUhlYWRlciIsInNjcm9sbEJsb2NrVG9wIiwic2Nyb2xsVG9wIiwid2luZG93IiwidmlzdWFsVmlld3BvcnQiLCJjbG9zZSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJpIiwibGVuZ3RoIiwib25jbGljayIsImRpdiIsInBhcmVudEVsZW1lbnQiLCJvcGFjaXR5Iiwic2V0VGltZW91dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvcmRlcjEiLCJjbGFzc0xpc3QiLCJhZGQiLCJsb2NhdGlvbiIsImhyZWYiLCJzY3JvbGxZIiwiaW5uZXJXaWR0aCIsInJlbW92ZSIsIm9uY2hhbmdlIiwiZXZlbnQiLCJzcmMiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJ0YXJnZXQiLCJmaWxlcyIsIm9ubW91c2VvdmVyIiwidmlld0NhcnQiLCJjb25zb2xlIiwibG9nIiwicHJldmVudERlZmF1bHQiLCJjbG9zZUYiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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R0FBckIsQ0FBeUIsUUFBekI7QUFDRDtBQUNGLEtBUkQ7QUFTRDtBQUFDLEMiLCJmaWxlIjoianMvbWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdDtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImRjYjc3NzdhMjBjNzdmNGNmMTI0XCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcIm1haW5cIjtcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoXCIuL2luZGV4LmpzXCIpKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsIi8qIC4uLi4uLi5TaWRlIG5hdmlnYXRpb24gbm9kZXMuLi4uLi4uLi4uLi4gKi9cclxuZXhwb3J0IGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhY2tkcm9wJyk7XHJcbmV4cG9ydCBjb25zdCBzaWRlbmF2V3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlbmF2V3JhcHBlcicpO1xyXG5leHBvcnQgY29uc3Qgc2lkZWRyYXdlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlZHJhd2VyJyk7XHJcbmV4cG9ydCBjb25zdCBsb2dpbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dpbkJ0bicpO1xyXG5leHBvcnQgY29uc3QgY3JlYXRlQWNjb3VudEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGVBY2NvdW50QnRuJyk7XHJcbmV4cG9ydCBjb25zdCBmb29kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb2QnKTtcclxuZXhwb3J0IGNvbnN0IGZvb2RDYXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb2RDYXJ0Jyk7XHJcbmV4cG9ydCBjb25zdCBpbWFnZUZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZScpO1xyXG5leHBvcnQgY29uc3QgaW1hZ2VPdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0Jyk7XHJcbmV4cG9ydCBjb25zdCBlZGl0MSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0MScpO1xyXG5leHBvcnQgY29uc3QgZWRpdDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdDInKTtcclxuZXhwb3J0IGNvbnN0IHJtMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdybTInKTtcclxuZXhwb3J0IGNvbnN0IHJtMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdybTEnKTtcclxuZXhwb3J0IGNvbnN0IGNsb3NlVXBkYXRlRm9vZEl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VVcGRhdGVGb29kSXRlbScpO1xyXG5leHBvcnQgY29uc3QgY2xvc2VEZWxldGVGb29kSXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZURlbGV0ZUZvb2RJdGVtJyk7XHJcbmV4cG9ydCBjb25zdCBvcmRlckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcmRlckJ0bicpO1xyXG5leHBvcnQgY29uc3Qgb3JkZXJCdG4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29yZGVyQnRuMicpO1xyXG5leHBvcnQgY29uc3QgY2xvc2VMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VMb2NhdGlvbkZvcm0nKTtcclxuZXhwb3J0IGNvbnN0IGNsb3NlTG9jYXRpb25Gb3JtMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZUxvY2F0aW9uRm9ybTInKTtcclxuZXhwb3J0IGNvbnN0IGNhcnRDbGlwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcnRDbGlwJyk7XHJcbmV4cG9ydCBjb25zdCBjYXRlZ29yeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXRlZ29yeScpO1xyXG5leHBvcnQgY29uc3QgY2F0ZWdvcnlMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhdGVnb3J5TGlzdCcpO1xyXG5leHBvcnQgY29uc3QgY2xvc2VPcmRlckRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VPcmRlckRldGFpbHMnKTtcclxuZXhwb3J0IGNvbnN0IG15Q2FydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUNhcnQnKTtcclxuZXhwb3J0IGNvbnN0IGZvb2RJdGVtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb2RJdGVtQ29udGFpbmVyJyk7XHJcbmV4cG9ydCBjb25zdCBidXJnZXIxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1cmdlcjEnKTtcclxuZXhwb3J0IGNvbnN0IGNsb3NlRm9vZFZhcmlhbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlRm9vZFZhcmlhbnRzJyk7XHJcbmV4cG9ydCBjb25zdCBoZWFkZXJQYW5lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlci1wYW5lJyk7XHJcbiIsImV4cG9ydCBjb25zdCBzaG93TW9kYWwgPSAoaWQsIG1vZGFsQmxvY2spID0+IHtcclxuICBzd2l0Y2ggKG1vZGFsQmxvY2spIHtcclxuICAgIGNhc2UgJ2RlbGV0ZUZvb2RJdGVtQ29udGVudCc6XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGRhdGVGb29kSXRlbUNvbnRlbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICBjb25zdCBkZWxldGVGb29kSXRlbUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVsZXRlRm9vZEl0ZW1Db250ZW50Jyk7XHJcbiAgICAgIGlmIChkZWxldGVGb29kSXRlbUNvbnRlbnQuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgZGVsZXRlRm9vZEl0ZW1Db250ZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICB9XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdsb2NhdGlvbkZvcm0nOlxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb29kVmFyaWFudHMnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICBjb25zdCBsb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9jYXRpb25Gb3JtJyk7XHJcbiAgICAgIGlmIChsb2NhdGlvbkZvcm0uc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvY2F0aW9uRm9ybScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICB9XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdmb29kVmFyaWFudHMnOlxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbkZvcm0gJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgY29uc3QgZm9vZFZhcmlhbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvb2RWYXJpYW50cycpO1xyXG4gICAgICBpZiAoZm9vZFZhcmlhbnRzLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb29kVmFyaWFudHMnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgfVxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnY2FydCc6XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbkZvcm0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9vZFZhcmlhbnRzJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgY29uc3QgY2FydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJ0Jyk7XHJcbiAgICAgIGlmIChjYXJ0LnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJ0Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgIH1cclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ29yZGVyRGV0YWlsJzpcclxuXHJcbiAgICAgIGNvbnN0IG9yZGVyRGV0YWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29yZGVyRGV0YWlsJyk7XHJcbiAgICAgIGlmIChvcmRlckRldGFpbC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3JkZXJEZXRhaWwnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgfVxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwZGF0ZUZvb2RJdGVtQ29udGVudCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVsZXRlRm9vZEl0ZW1Db250ZW50Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjbG9zZU1vZGFsID0gaWQgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuIiwiZXhwb3J0IGNvbnN0IG9wZW5uYXYgPSAoKSA9PiB7XHJcbiAgLy8gY29uc29sZS5sb2coJ3NpZGVkcmF3ZXIgaXMgY2xpY2tlZCcpO1xyXG4gIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIHNpZGVuYXZXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKDAlKSc7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY2xvc2VuYXYgPSAoKSA9PiB7XHJcblxyXG4gIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgc2lkZW5hdldyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoLTEwMCUpJztcclxuXHJcbn07IiwiY29uc3QgdGhTbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGgtc25cIik7XHJcbmNvbnN0IHRoQ3VzdG9tZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoLWN1c3RvbWVyTmFtZVwiKTtcclxuY29uc3QgdGhEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGgtZGVzY3JpcHRpb25cIik7XHJcbmNvbnN0IHRoVGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGgtdGltZVwiKTtcclxuY29uc3QgdGhEZWxpdmVyeVRpbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoLWRlbGl2ZXJ5VGltZVwiKTtcclxuY29uc3QgdGhQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGgtcHJpY2VcIik7XHJcbmNvbnN0IHRoQWN0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGgtYWN0aW9uc1wiKTtcclxuY29uc3QgdGhDb21wbGV0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGgtY29tcGxldGVcIik7XHJcbmNvbnN0IHRoUGljdHVyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGgtcGljdHVyZVwiKTtcclxuY29uc3QgdGhPcmRlckRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoLW9yZGVyRGF0ZVwiKTtcclxuY29uc3QgdGhPcmRlclRpbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoLW9yZGVyVGltZVwiKTtcclxuY29uc3QgdGhPcmRlclF1YW50aXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aC1xdWFudGl0eVwiKTtcclxuY29uc3QgdGhBbW91bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoLWFtb3VudFwiKTtcclxuY29uc3QgdGhTdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoLXN0YXR1c1wiKTtcclxuY29uc3QgY3VzdG9tZXJPcmRlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1c3RvbWVyT3JkZXJzXCIpO1xyXG5jb25zdCB1c2VyT3JkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJPcmRlclwiKTtcclxuXHJcblxyXG5jb25zdCBoU24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImgtc25cIik7XHJcbmNvbnN0IGhDdXN0b21lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1jdXN0b21lck5hbWVcIik7XHJcbmNvbnN0IGhEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1kZXNjcmlwdGlvblwiKTtcclxuY29uc3QgaFRpbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImgtb3JkZXJUaW1lXCIpO1xyXG5jb25zdCBoRGVsaXZlcnlUaW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoLWRlbGl2ZXJ5VGltZVwiKTtcclxuY29uc3QgaFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoLXByaWNlXCIpO1xyXG5jb25zdCBoQWN0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1hY3Rpb25zXCIpO1xyXG5jb25zdCBoQ29tcGxldGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImgtY29tcGxldGVcIik7XHJcblxyXG5jb25zdCBzY3JvbGxCbG9jayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2Nyb2xsQmxvY2tcIik7XHJcblxyXG5mdW5jdGlvbiByZXNDb2woKXtcclxuICAgIGNvbnN0IHNlcmlhbE5vQ29sID0gdGhTbi5nZXRDbGllbnRSZWN0cygpWzBdLndpZHRoO1xyXG4gICAgY29uc3QgY3VzdG9tZXJDb2wgPSB0aEN1c3RvbWVyLmdldENsaWVudFJlY3RzKClbMF0ud2lkdGg7XHJcbiAgICBjb25zdCB0aW1lQ29sID0gdGhUaW1lLmdldENsaWVudFJlY3RzKClbMF0ud2lkdGg7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbkNvbCA9IHRoRGVzY3JpcHRpb24uZ2V0Q2xpZW50UmVjdHMoKVswXS53aWR0aDtcclxuICAgIGNvbnN0IGRlbGl2ZXJ5VGltZSA9IHRoRGVsaXZlcnlUaW1lLmdldENsaWVudFJlY3RzKClbMF0ud2lkdGg7XHJcbiAgICBjb25zdCBwcmljZUNvbCA9IHRoUHJpY2UuZ2V0Q2xpZW50UmVjdHMoKVswXS53aWR0aDtcclxuICAgIGNvbnN0IGFjdGlvbnNDb2wgPSB0aEFjdGlvbnMuZ2V0Q2xpZW50UmVjdHMoKVswXS53aWR0aDtcclxuICAgIGNvbnN0IGNvbXBsZXRlQ29sID0gdGhDb21wbGV0ZS5nZXRDbGllbnRSZWN0cygpWzBdLndpZHRoO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoLXNuXCIpLnN0eWxlLndpZHRoID0gKHNlcmlhbE5vQ29sLTEwKS50b1N0cmluZygpLmNvbmNhdChcInB4XCIpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoLWN1c3RvbWVyTmFtZVwiKS5zdHlsZS53aWR0aCA9IChjdXN0b21lckNvbC0xMC45KS50b1N0cmluZygpLmNvbmNhdChcInB4XCIpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoLWRlc2NyaXB0aW9uXCIpLnN0eWxlLndpZHRoID0gKGRlc2NyaXB0aW9uQ29sLTEwLjkpLnRvU3RyaW5nKCkuY29uY2F0KFwicHhcIik7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImgtb3JkZXJUaW1lXCIpLnN0eWxlLndpZHRoID0gKHRpbWVDb2wtMTAuOSkudG9TdHJpbmcoKS5jb25jYXQoXCJweFwiKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1kZWxpdmVyeVRpbWVcIikuc3R5bGUud2lkdGggPSAoZGVsaXZlcnlUaW1lLTEwLjkpLnRvU3RyaW5nKCkuY29uY2F0KFwicHhcIik7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImgtcHJpY2VcIikuc3R5bGUud2lkdGggPSAocHJpY2VDb2wtMTAuOSkudG9TdHJpbmcoKS5jb25jYXQoXCJweFwiKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1hY3Rpb25zXCIpLnN0eWxlLndpZHRoID0gKGFjdGlvbnNDb2wgLSAxMC45KS50b1N0cmluZygpLmNvbmNhdChcInB4XCIpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoLWNvbXBsZXRlXCIpLnN0eWxlLndpZHRoID0gKCBjb21wbGV0ZUNvbC0xMC45KS50b1N0cmluZygpLmNvbmNhdChcInB4XCIpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gcmVzQ29sMigpe1xyXG4gICAgY29uc3Qgc2VyaWFsTm9Db2wgPSB0aFNuLmdldENsaWVudFJlY3RzKClbMF0ud2lkdGg7XHJcbiAgICBjb25zdCBwaWN0dXJlQ29sID0gdGhQaWN0dXJlLmdldENsaWVudFJlY3RzKClbMF0ud2lkdGg7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbkNvbCA9IHRoRGVzY3JpcHRpb24uZ2V0Q2xpZW50UmVjdHMoKVswXS53aWR0aDtcclxuICAgIGNvbnN0IGRhdGVDb2wgPSB0aE9yZGVyRGF0ZS5nZXRDbGllbnRSZWN0cygpWzBdLndpZHRoO1xyXG4gICAgY29uc3QgdGltZUNvbCA9IHRoT3JkZXJUaW1lLmdldENsaWVudFJlY3RzKClbMF0ud2lkdGg7XHJcbiAgICBjb25zdCBxdWFudGl0eUNvbCA9IHRoT3JkZXJRdWFudGl0eS5nZXRDbGllbnRSZWN0cygpWzBdLndpZHRoO1xyXG4gICAgY29uc3QgYW1vdW50Q29sID0gdGhBbW91bnQuZ2V0Q2xpZW50UmVjdHMoKVswXS53aWR0aDtcclxuICAgIGNvbnN0IHN0YXR1c0NvbCA9IHRoU3RhdHVzLmdldENsaWVudFJlY3RzKClbMF0ud2lkdGg7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImgtc25cIikuc3R5bGUud2lkdGggPSAoc2VyaWFsTm9Db2wtMTAuOSkudG9TdHJpbmcoKS5jb25jYXQoXCJweFwiKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1waWN0dXJlXCIpLnN0eWxlLndpZHRoID0gKHBpY3R1cmVDb2wtMTAuOSkudG9TdHJpbmcoKS5jb25jYXQoXCJweFwiKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1kZXNjcmlwdGlvblwiKS5zdHlsZS53aWR0aCA9IChkZXNjcmlwdGlvbkNvbC0xMC45KS50b1N0cmluZygpLmNvbmNhdChcInB4XCIpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoLW9yZGVyRGF0ZVwiKS5zdHlsZS53aWR0aCA9IChkYXRlQ29sLSAxMC45KS50b1N0cmluZygpLmNvbmNhdChcInB4XCIpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoLW9yZGVyVGltZVwiKS5zdHlsZS53aWR0aCA9ICh0aW1lQ29sLTEwLjkpLnRvU3RyaW5nKCkuY29uY2F0KFwicHhcIik7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImgtcXVhbnRpdHlcIikuc3R5bGUud2lkdGggPSAocXVhbnRpdHlDb2wtMTAuOSkudG9TdHJpbmcoKS5jb25jYXQoXCJweFwiKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1hbW91bnRcIikuc3R5bGUud2lkdGggPSAoYW1vdW50Q29sIC0gMTAuOSkudG9TdHJpbmcoKS5jb25jYXQoXCJweFwiKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaC1zdGF0dXNcIikuc3R5bGUud2lkdGggPSAoIHN0YXR1c0NvbC0xMC45KS50b1N0cmluZygpLmNvbmNhdChcInB4XCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5VGFibGVIZWFkZXIoKSB7XHJcbiAgICBjb25zdCBzY3JvbGxCbG9ja1RvcCA9IHNjcm9sbEJsb2NrLnNjcm9sbFRvcDtcclxuICAgIGlmKHNjcm9sbEJsb2NrVG9wID4gMCAmJiB3aW5kb3cudmlzdWFsVmlld3BvcnQud2lkdGggPiA3MDAgKXtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhYmxlSGVhZGVyXCIpLnN0eWxlLmRpc3BsYXk9XCJmbGV4XCI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoc2Nyb2xsQmxvY2tUb3AgPT09IDAgKXtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhYmxlSGVhZGVyXCIpLnN0eWxlLmRpc3BsYXk9XCJub25lXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEdldCBhbGwgZWxlbWVudHMgd2l0aCBjbGFzcz1cImNsb3NlYnRuXCJcclxudmFyIGNsb3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNsb3NlYnRuXCIpO1xyXG52YXIgaTtcclxuXHJcbi8vIExvb3AgdGhyb3VnaCBhbGwgY2xvc2UgYnV0dG9uc1xyXG5mb3IgKGkgPSAwOyBpIDwgY2xvc2UubGVuZ3RoOyBpKyspIHtcclxuICAgIC8vIFdoZW4gc29tZW9uZSBjbGlja3Mgb24gYSBjbG9zZSBidXR0b25cclxuICAgIGNsb3NlW2ldLm9uY2xpY2sgPSBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIHBhcmVudCBvZiA8c3BhbiBjbGFzcz1cImNsb3NlYnRuXCI+ICg8ZGl2IGNsYXNzPVwiYWxlcnRcIj4pXHJcbiAgICAgICAgdmFyIGRpdiA9IHRoaXMucGFyZW50RWxlbWVudDtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRoZSBvcGFjaXR5IG9mIGRpdiB0byAwICh0cmFuc3BhcmVudClcclxuICAgICAgICBkaXYuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG5cclxuICAgICAgICAvLyBIaWRlIHRoZSBkaXYgYWZ0ZXIgNjAwbXMgKHRoZSBzYW1lIGFtb3VudCBvZiBtaWxsaXNlY29uZHMgaXQgdGFrZXMgdG8gZmFkZSBvdXQpXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyBkaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiOyB9LCA2MDApO1xyXG4gICAgfVxyXG59XHJcblxyXG5pZiAoY3VzdG9tZXJPcmRlcnMpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcmVzQ29sKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNDb2wpO1xyXG4gICAgc2Nyb2xsQmxvY2suYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZGlzcGxheVRhYmxlSGVhZGVyKTtcclxuICAgIHNjcm9sbEJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHJlc0NvbCk7XHJcbiAgICBjb25zdCBvcmRlcjEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIjFcIik7XHJcbiAgICBpZihvcmRlcjEpe1xyXG4gICAgICAgIG9yZGVyMS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNob3dNb2RhbCgnbW9kYWwnKSk7XHJcbiAgICB9XHJcbiAgIFxyXG59O1xyXG5cclxuY29uc3Qgc2hvd01vZGFsID0gKGlkKSA9PiB7XHJcblx0cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG59O1xyXG5cclxuY29uc3QgY2xvc2VNb2RhbCA9IChpZCkgPT4ge1xyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbn1cclxuXHJcbmlmICh1c2VyT3JkZXIpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcmVzQ29sMik7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzQ29sMik7XHJcbiAgICBzY3JvbGxCbG9jay5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBkaXNwbGF5VGFibGVIZWFkZXIpO1xyXG4gICAgc2Nyb2xsQmxvY2suYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgcmVzQ29sMik7XHJcbn1cclxuXHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCAnLi9pbmRleC5jc3MnO1xyXG5pbXBvcnQge1xyXG4gIHNpZGVkcmF3ZXIsXHJcbiAgYmFja2Ryb3AsXHJcbiAgc2lkZW5hdldyYXBwZXIsXHJcbiAgY3JlYXRlQWNjb3VudEJ0bixcclxuICBsb2dpbkJ0bixcclxuICBmb29kLFxyXG4gIGZvb2RDYXJ0LFxyXG4gIGltYWdlRmlsZSxcclxuICBpbWFnZU91dHB1dCxcclxuICBlZGl0MSxcclxuICBlZGl0MixcclxuICBybTEsXHJcbiAgcm0yLFxyXG4gIGNsb3NlVXBkYXRlRm9vZEl0ZW0sXHJcbiAgY2xvc2VEZWxldGVGb29kSXRlbSxcclxuICBvcmRlckJ0bixcclxuICBvcmRlckJ0bjIsXHJcbiAgY2xvc2VMb2NhdGlvbkZvcm0sXHJcbiAgY2xvc2VMb2NhdGlvbkZvcm0yLFxyXG4gIGNhcnRDbGlwLFxyXG4gIGNhdGVnb3J5LFxyXG4gIGNhdGVnb3J5TGlzdCxcclxuICBjbG9zZU9yZGVyRGV0YWlscyxcclxuICBteUNhcnQsXHJcbiAgZm9vZEl0ZW1Db250YWluZXIsXHJcbiAgYnVyZ2VyMSxcclxuICBoZWFkZXJQYW5lLFxyXG4gIGNsb3NlRm9vZFZhcmlhbnRzLFxyXG59IGZyb20gJy4vYXNzZXRzL2pzL2dsb2JhbHMnO1xyXG5pbXBvcnQgeyBvcGVubmF2LCBjbG9zZW5hdiB9IGZyb20gJy4vYXNzZXRzL2pzL3NpZGVuYXYnO1xyXG5pbXBvcnQge1xyXG4gIHNob3dNb2RhbCxcclxuICBjbG9zZU1vZGFsLFxyXG59IGZyb20gJy4vYXNzZXRzL2pzL21vZGFsJztcclxuaW1wb3J0ICcuL2Fzc2V0cy9qcy90YWJsZSc7XHJcblxyXG5pZiAoc2lkZWRyYXdlcikge1xyXG4gIHNpZGVkcmF3ZXIub25jbGljayA9ICgpID0+IG9wZW5uYXYoKTtcclxufVxyXG5cclxuaWYgKGJhY2tkcm9wKSB7XHJcbiAgYmFja2Ryb3Aub25jbGljayA9ICgpID0+IHtcclxuICAgIGNsb3NlbmF2KCk7XHJcbiAgICBpZiAoY2F0ZWdvcnlMaXN0KSB7XHJcbiAgICAgIGNhdGVnb3J5TGlzdC5jbGFzc0xpc3QuYWRkKCctc2lkZW5hdi1mb29kLW5hdmlnYXRpb24tLWlzSGlkZGVuJyk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuaWYgKGNyZWF0ZUFjY291bnRCdG4pIHtcclxuICBjcmVhdGVBY2NvdW50QnRuLm9uY2xpY2sgPSAoKSA9PiB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcuL3VzZXIuaHRtbCc7XHJcbn1cclxuXHJcbmlmIChsb2dpbkJ0bikge1xyXG4gIGxvZ2luQnRuLm9uY2xpY2sgPSAoKSA9PiB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcuL3VzZXIuaHRtbCc7XHJcbn1cclxuXHJcbmlmIChmb29kIHx8IGZvb2RDYXJ0KSB7XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcclxuICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA+PSAzNzAgJiYgd2luZG93LmlubmVyV2lkdGggPiA5OTEpIHtcclxuICAgICAgZm9vZC5jbGFzc0xpc3QuYWRkKCdmb29kTmF2V3JhcHBlci1vbldpbmRvd1Njcm9sbCcpO1xyXG4gICAgICBmb29kSXRlbUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCctb2Zmc2V0LWwtMngnKTtcclxuICAgIH0gZWxzZSBpZiAod2luZG93LnNjcm9sbFkgPCAzNzAgJiYgd2luZG93LmlubmVyV2lkdGggPiA5OTEpIHtcclxuICAgICAgZm9vZC5jbGFzc0xpc3QucmVtb3ZlKCdmb29kTmF2V3JhcHBlci1vbldpbmRvd1Njcm9sbCcpO1xyXG4gICAgICBmb29kSXRlbUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCctb2Zmc2V0LWwtMngnKTtcclxuICAgIH0gZWxzZSBpZiAod2luZG93LnNjcm9sbFkgPj0gMzcwICYmIHdpbmRvdy5pbm5lcldpZHRoIDwgOTkxICYmIHdpbmRvdy5pbm5lcldpZHRoID4gNjAwKSB7XHJcbiAgICAgIGZvb2QuY2xhc3NMaXN0LmFkZCgnZm9vZE5hdldyYXBwZXItb25XaW5kb3dTY3JvbGwnKTtcclxuICAgICAgZm9vZEl0ZW1Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnLW9mZnNldC1tLTN4Jyk7XHJcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5zY3JvbGxZIDwgMzYwICYmIHdpbmRvdy5pbm5lcldpZHRoIDwgOTkxKSB7XHJcbiAgICAgIGZvb2QuY2xhc3NMaXN0LnJlbW92ZSgnZm9vZE5hdldyYXBwZXItb25XaW5kb3dTY3JvbGwnKTtcclxuICAgICAgZm9vZEl0ZW1Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnLW9mZnNldC1tLTN4Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHdpbmRvdy5zY3JvbGxZID49IDQwKSB7XHJcbiAgICAgIGZvb2RDYXJ0LmNsYXNzTGlzdC5hZGQoJ2Zvb2RDYXJ0LW9uV2luZG93U2Nyb2xsJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb29kQ2FydC5jbGFzc0xpc3QucmVtb3ZlKCdmb29kQ2FydC1vbldpbmRvd1Njcm9sbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA+PSAzNzUpIHtcclxuICAgICAgY2FydENsaXAuY2xhc3NMaXN0LmFkZCgnY2FydENsaXAtb25XaW5kb3dTY3JvbGwnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNhcnRDbGlwLmNsYXNzTGlzdC5yZW1vdmUoJ2NhcnRDbGlwLW9uV2luZG93U2Nyb2xsJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmlmIChpbWFnZUZpbGUpIHtcclxuICBpbWFnZUZpbGUub25jaGFuZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgIGltYWdlT3V0cHV0LnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZXZlbnQudGFyZ2V0LmZpbGVzWzBdKTtcclxuICB9O1xyXG59XHJcblxyXG5pZiAoZWRpdDEpIHtcclxuICBlZGl0MS5vbmNsaWNrID0gKCkgPT4gc2hvd01vZGFsKCdtb2RhbCcsICd1cGRhdGVGb29kSXRlbUNvbnRlbnQnKTtcclxufVxyXG5cclxuaWYgKGVkaXQyKSB7XHJcbiAgZWRpdDIub25jbGljayA9ICgpID0+IHNob3dNb2RhbCgnbW9kYWwnLCAndXBkYXRlRm9vZEl0ZW1Db250ZW50Jyk7XHJcbn1cclxuXHJcbmlmIChjbG9zZVVwZGF0ZUZvb2RJdGVtKSB7XHJcbiAgY2xvc2VVcGRhdGVGb29kSXRlbS5vbmNsaWNrID0gKCkgPT4gY2xvc2VNb2RhbCgnbW9kYWwnKTtcclxufVxyXG5cclxuaWYgKHJtMSkge1xyXG4gIHJtMS5vbmNsaWNrID0gKCkgPT4gc2hvd01vZGFsKCdtb2RhbCcsICdkZWxldGVGb29kSXRlbUNvbnRlbnQnKTtcclxufVxyXG5cclxuaWYgKHJtMikge1xyXG4gIHJtMi5vbmNsaWNrID0gKCkgPT4gc2hvd01vZGFsKCdtb2RhbCcsICdkZWxldGVGb29kSXRlbUNvbnRlbnQnKTtcclxufVxyXG5cclxuXHJcbmlmIChjbG9zZURlbGV0ZUZvb2RJdGVtKSB7XHJcbiAgY2xvc2VEZWxldGVGb29kSXRlbS5vbmNsaWNrID0gKCkgPT4gY2xvc2VNb2RhbCgnbW9kYWwnKTtcclxufVxyXG5cclxuaWYgKG9yZGVyQnRuKSB7XHJcbiAgb3JkZXJCdG4ub25jbGljayA9ICgpID0+IHNob3dNb2RhbCgnbW9kYWwnLCAnbG9jYXRpb25Gb3JtJyk7XHJcbn1cclxuXHJcbmlmIChvcmRlckJ0bjIpIHtcclxuICBvcmRlckJ0bjIub25jbGljayA9ICgpID0+IHNob3dNb2RhbCgnbW9kYWwnLCAnbG9jYXRpb25Gb3JtJyk7XHJcbn1cclxuXHJcbmlmIChjbG9zZUxvY2F0aW9uRm9ybSkge1xyXG4gIGNsb3NlTG9jYXRpb25Gb3JtLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjbG9zZU1vZGFsKCdtb2RhbCcpO1xyXG4gIH07XHJcbn1cclxuXHJcbmlmIChjbG9zZUZvb2RWYXJpYW50cykge1xyXG4gIGNsb3NlRm9vZFZhcmlhbnRzLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjbG9zZU1vZGFsKCdtb2RhbCcpO1xyXG4gIH07XHJcbn1cclxuXHJcbmlmIChjbG9zZUxvY2F0aW9uRm9ybTIpIHtcclxuICBjbG9zZUxvY2F0aW9uRm9ybTIub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNsb3NlTW9kYWwoJ21vZGFsJyk7XHJcbiAgfTtcclxufVxyXG5cclxuaWYgKGNhcnRDbGlwKSB7XHJcbiAgY2FydENsaXAub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHNob3dNb2RhbCgnbW9kYWwnLCAnY2FydCcpO1xyXG4gIH07XHJcbn1cclxuXHJcbmlmIChjYXRlZ29yeSkge1xyXG4gIGNhdGVnb3J5Lm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYXRlZ29yeUxpc3QuY2xhc3NMaXN0LnJlbW92ZSgnLXNpZGVuYXYtZm9vZC1uYXZpZ2F0aW9uLS1pc0hpZGRlbicpO1xyXG4gIH07XHJcblxyXG4gIGNhdGVnb3J5Lm9ubW91c2VvdmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY2F0ZWdvcnlMaXN0LmNsYXNzTGlzdC5hZGQoJy1zaWRlbmF2LWZvb2QtbmF2aWdhdGlvbi0taXNIaWRkZW4nKTtcclxuICB9O1xyXG5cclxuICBjYXRlZ29yeUxpc3Qub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNhdGVnb3J5TGlzdC5jbGFzc0xpc3QuYWRkKCctc2lkZW5hdi1mb29kLW5hdmlnYXRpb24tLWlzSGlkZGVuJyk7XHJcbiAgfTtcclxufVxyXG5cclxuaWYgKGNsb3NlT3JkZXJEZXRhaWxzKSB7XHJcbiAgY2xvc2VPcmRlckRldGFpbHMub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNsb3NlTW9kYWwoJ21vZGFsJyk7XHJcbiAgfTtcclxufVxyXG5sZXQgdmlld0NhcnQgPSB0cnVlO1xyXG5pZiAobXlDYXJ0ICYmIHdpbmRvdy5pbm5lcldpZHRoID4gOTAwKSB7XHJcbiAgbXlDYXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnbXljYXJ0Jyk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKHZpZXdDYXJ0KSB7XHJcbiAgICAgIGZvb2RDYXJ0LmNsYXNzTGlzdC5yZW1vdmUoJ2Zvb2RDYXJ0LWlzSGlkZGVuJyk7XHJcbiAgICAgIGZvb2RDYXJ0LmNsYXNzTGlzdC5hZGQoJ2Zvb2RDYXJ0LWlzVmlzaWJsZScpO1xyXG4gICAgICBmb29kSXRlbUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCctY29sLWwtOScpO1xyXG4gICAgICBmb29kSXRlbUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCctY29sLWwtOCcpO1xyXG4gICAgICB2aWV3Q2FydCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9vZENhcnQuY2xhc3NMaXN0LmFkZCgnZm9vZENhcnQtaXNIaWRkZW4nKTtcclxuICAgICAgZm9vZENhcnQuY2xhc3NMaXN0LnJlbW92ZSgnZm9vZENhcnQtaXNWaXNpYmxlJyk7XHJcbiAgICAgIGZvb2RJdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJy1jb2wtbC05Jyk7XHJcbiAgICAgIGZvb2RJdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJy1jb2wtbC04Jyk7XHJcbiAgICAgIHZpZXdDYXJ0ID0gdHJ1ZTtcclxuICAgIH1cclxuICB9KTtcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgZm9vZENhcnQuY2xhc3NMaXN0LmFkZCgnaGlkZS1vbi1tZWRpdW0tYW5kLWRvd24nKTtcclxuICAgIGZvb2RDYXJ0LmNsYXNzTGlzdC5hZGQoJ2Zvb2RDYXJ0LWlzSGlkZGVuJyk7XHJcbiAgICBmb29kQ2FydC5jbGFzc0xpc3QucmVtb3ZlKCdmb29kQ2FydC1pc1Zpc2libGUnKTtcclxuICAgIGZvb2RJdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJy1jb2wtbC04Jyk7XHJcbiAgICBmb29kSXRlbUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCctY29sLWwtOScpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5pZiAoYnVyZ2VyMSkge1xyXG4gIGJ1cmdlcjEub25jbGljayA9ICgpID0+IHtcclxuICAgIHNob3dNb2RhbCgnbW9kYWwnLCAnZm9vZFZhcmlhbnRzJyk7XHJcbiAgfTtcclxufVxyXG5cclxuaWYgKGNsb3NlRikgICB7aWYgKGhlYWRlclBhbmUpIHtcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgaWYgKHdpbmRvdy5zY3JvbGxZID4gNDApIHtcclxuICAgICAgaGVhZGVyUGFuZS5jbGFzc0xpc3QucmVtb3ZlKCdoZWFkZXInKTtcclxuICAgICAgaGVhZGVyUGFuZS5jbGFzc0xpc3QuYWRkKCdoZWFkZXItd2l0aC1maXhlZC1wb3NpdGlvbicpO1xyXG4gICAgfSBlbHNlIGlmICh3aW5kb3cuc2Nyb2xsWSA8IDQwKSB7XHJcbiAgICAgIGhlYWRlclBhbmUuY2xhc3NMaXN0LnJlbW92ZSgnaGVhZGVyLXdpdGgtZml4ZWQtcG9zaXRpb24nKTtcclxuICAgICAgaGVhZGVyUGFuZS5jbGFzc0xpc3QuYWRkKCdoZWFkZXInKTtcclxuICAgIH1cclxuICB9KTtcclxufX1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==