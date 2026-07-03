/**
 * KeyboardNavigationTable Library
 * Part of CraftThingy Digital Innovation SDK
 * Licensed under Public-Source Corporate Royalty License (PSCRL)
 */

export class KeyboardNavTable {
    constructor(config = {}) {
        this.tableElement = typeof config.tableElement === 'string'
            ? document.querySelector(config.tableElement)
            : config.tableElement;

        this.inputSelector = config.inputSelector || '.cell-input';
        this.onEnterKey = config.onEnterKey || null;
        this.onTabLast = config.onTabLast || null;
        
        this._keydownHandler = this._handleKeyDown.bind(this);
    }

    initialize() {
        if (!this.tableElement) return;
        this.tableElement.addEventListener('keydown', this._keydownHandler);
    }

    _handleKeyDown(e, inputEl = null) {
        const input = inputEl || e.target;
        if (!input.matches(this.inputSelector)) return;

        const rowEl = input.closest('tr');
        if (!rowEl) return;

        const inputs = Array.from(rowEl.querySelectorAll(this.inputSelector));
        const colIdx = inputs.indexOf(input);
        const nextRow = rowEl.nextElementSibling;
        const prevRow = rowEl.previousElementSibling;

        if (e.key === 'Enter') {
            if (this.onEnterKey) {
                this.onEnterKey(e, { colIdx, rowEl, nextRow, input });
            } else {
                e.preventDefault();
                if (nextRow) {
                    const nextInput = nextRow.querySelectorAll(this.inputSelector)[colIdx];
                    if (nextInput) nextInput.focus();
                }
            }
        }

        if (e.key === 'ArrowDown') {
            if (nextRow) {
                const nextInput = nextRow.querySelectorAll(this.inputSelector)[colIdx];
                if (nextInput) nextInput.focus();
            }
        }

        if (e.key === 'ArrowUp') {
            if (prevRow) {
                const prevInput = prevRow.querySelectorAll(this.inputSelector)[colIdx];
                if (prevInput) prevInput.focus();
            }
        }

        if (e.key === 'Tab' && !e.shiftKey && colIdx === inputs.length - 1) {
            if (this.onTabLast) {
                this.onTabLast(e, { rowEl, nextRow, input });
            }
        }
    }

    destroy() {
        if (this.tableElement) {
            this.tableElement.removeEventListener('keydown', this._keydownHandler);
        }
    }
}
