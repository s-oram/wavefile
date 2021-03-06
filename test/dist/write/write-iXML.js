/**
 * WaveFile: https://github.com/rochars/wavefile
 * Copyright (c) 2017-2020 Rafael da Silva Rocha. MIT License.
 *
 * Write files with iXML chunk.
 * 
 */

const assert = require("assert");
const fs = require("fs");
const WaveFile = require("../../../test/loader.js");
const path = "./test/files/";

describe("Change the value of iXML chunk", function() {
	/*
    let wav = new WaveFile(
        fs.readFileSync(path + "24bit-48kHz-1c-mixpre6-hiser_interview.WAV"));
    wav.iXML.value = '<pmx/>';
    let wav2 = new WaveFile(wav.toBuffer());
    */
    let wav = new WaveFile();
    wav.fromScratch(1, 48000, '24', [0, 1, -8388608, 8388607])
    wav.iXML.chunkId = 'iXML';
    wav.iXML.value = '<pmx/>';
    let wav2 = new WaveFile(wav.toBuffer());

    it("should find the 'iXML' chunk", function() {
        assert.equal(wav2.iXML.chunkId, "iXML");
    });
    it("'iXML' chunkSize should be 6", function() {
        assert.equal(wav2.iXML.chunkSize, 6);
    });
    it("'iXML' value should be a string with length 6", function() {
        assert.equal(wav2.iXML.value.length, 6);
    });
    it("'iXML' value in new file should be equal to the one in the original file", function() {
        assert.equal(wav2.iXML.value, '<pmx/>');
    });

});
