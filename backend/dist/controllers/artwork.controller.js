"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArtistProfile = exports.deleteArtworkById = exports.updateArtworkById = exports.getArtworkById = exports.listArtworks = exports.addArtwork = void 0;
const artwork_service_1 = require("../services/artwork.service");
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
const artwork_validator_1 = require("../validators/artwork.validator");
const artwork_validator_2 = require("../validators/artwork.validator");
const addArtwork = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, description, imageUrl, price } = req.body;
        const parsed = artwork_validator_1.artworkSchema.safeParse({ title, description, imageUrl, price });
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
        }
        const reqUser = req;
        const userId = (_a = reqUser.user) === null || _a === void 0 ? void 0 : _a.id;
        console.log('➡️  User ID from token:', userId);
        const artist = yield prismaClient_1.default.artist.findUnique({ where: { userId } });
        console.log('➡️  Found artist:', artist);
        if (!artist) {
            return res.status(403).json({ error: 'No artist found for this user.' });
        }
        const artwork = yield (0, artwork_service_1.createArtwork)({
            title,
            description,
            imageUrl,
            price,
            artistId: artist.id,
        });
        res.status(201).json(artwork);
    }
    catch (error) {
        console.error('❌ Error creating artwork:', error);
        res.status(400).json({ error: 'Failed to create artwork' });
    }
});
exports.addArtwork = addArtwork;
const listArtworks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artworks = yield (0, artwork_service_1.getAllArtworks)();
        res.status(200).json(artworks);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch artworks' });
    }
});
exports.listArtworks = listArtworks;
const getArtworkById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const artwork = yield prismaClient_1.default.artwork.findUnique({ where: { id } });
        if (!artwork) {
            return res.status(404).json({ error: 'Artwork not found' });
        }
        res.status(200).json(artwork);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch artwork' });
    }
});
exports.getArtworkById = getArtworkById;
const updateArtworkById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, imageUrl, price } = req.body;
    const parsed = artwork_validator_1.artworkUpdateSchema.safeParse({ title, description, imageUrl, price });
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    }
    try {
        const updated = yield (0, artwork_service_1.updateArtwork)(id, { title, description, imageUrl, price });
        if (!updated) {
            return res.status(404).json({ error: 'Artwork not found' });
        }
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update artwork' });
    }
});
exports.updateArtworkById = updateArtworkById;
const deleteArtworkById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield (0, artwork_service_1.deleteArtwork)(id);
        res.status(200).json({ message: 'Artwork deleted', deleted });
    }
    catch (error) {
        console.error('❌ Error deleting artwork:', error);
        res.status(400).json({ error: 'Failed to delete artwork' });
    }
});
exports.deleteArtworkById = deleteArtworkById;
const createArtistProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const reqUser = req;
    const userId = (_a = reqUser.user) === null || _a === void 0 ? void 0 : _a.id;
    const { bio, website } = req.body;
    const parsed = artwork_validator_2.artistProfileSchema.safeParse({ bio, website });
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    }
    try {
        const existing = yield prismaClient_1.default.artist.findUnique({ where: { userId } });
        if (existing) {
            return res.status(400).json({ error: 'Artist profile already exists' });
        }
        const artist = yield prismaClient_1.default.artist.create({
            data: {
                userId,
                bio,
                website,
            },
        });
        res.status(201).json(artist);
    }
    catch (error) {
        console.error('❌ Error creating artist profile:', error);
        res.status(400).json({ error: 'Failed to create artist profile' });
    }
});
exports.createArtistProfile = createArtistProfile;
