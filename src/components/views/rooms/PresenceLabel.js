/*
Copyright 2015, 2016 OpenMarket Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';

import React from 'react';

import { _t } from '../../../languageHandler';


module.exports = React.createClass({
    displayName: 'PresenceLabel',

    propTypes: {
        // number of milliseconds ago this user was last active.
        // zero = unknown
        activeAgo: React.PropTypes.number,

        // if true, activeAgo is an approximation and "Now" should
        // be shown instead
        currentlyActive: React.PropTypes.bool,

        // offline, online, etc
        presenceState: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            ago: -1,
            presenceState: null,
        };
    },

    getDuration: function(time) {
        if (!time) return;
        const t = parseInt(time / 1000);
        const s = t % 60;
        const m = parseInt(t / 60) % 60;
        const h = parseInt(t / (60 * 60)) % 24;
        const d = parseInt(t / (60 * 60 * 24));
        if (t < 60) {
            if (t < 0) {
                return _t("for %(amount)ss", {amount: 0});
            }
            return _t("for %(amount)ss", {amount: s});
        }
        if (t < 60 * 60) {
            return _t("for %(amount)sm", {amount: m});
        }
        if (t < 24 * 60 * 60) {
            return _t("for %(amount)sh", {amount: h});
        }
        return _t("for %(amount)sd", {amount: d});
    },

    getPrettyPresence: function(presence) {
        if (presence === "online") return _t("Online");
        if (presence === "unavailable") return _t("Idle"); // XXX: is this actually right?
        if (presence === "offline") return _t("Offline");
        return _t("Unknown");
    },

    render: function() {
        if (this.props.activeAgo >= 0) {
            const duration = this.getDuration(this.props.activeAgo);
            const ago = this.props.currentlyActive || !duration ? "" : duration;
            return (
                <div className="mx_PresenceLabel">
                    { this.getPrettyPresence(this.props.presenceState) } { ago }
                </div>
            );
        } else {
            return (
                <div className="mx_PresenceLabel">
                    { this.getPrettyPresence(this.props.presenceState) }
                </div>
            );
        }
    },
});
