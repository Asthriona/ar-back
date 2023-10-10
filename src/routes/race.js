const router = require("express").Router();
const Driver = require("../models/driver")
const Race = require("../models/race")

/**
 * レース情報を取得するためのGETリクエストを処理します。
 *
 * @param {import('express').Request} req - Expressのリクエストオブジェクト。
 * @param {import('express').Response} res - Expressのレスポンスオブジェクト。
 * @returns {Promise<void>}
 * @param {string} req.params.raceCode - レースコードを示すルートパラメータ。
 */
router.get('/:raceCode', async (req,res) => {
    const code = req.params.raceCode;
    const race = await Race.findOne({ name: code }).populate("winner").populate("participant");
    if(!race) return res.status(404).json({ message: "404 Not found." })
    res.json({
        race
    });
});

// Get all Race from database
router.get('/', async (req,res) => {
    const races = await Race.find().populate("winner").populate("participant");
    if(!races) return res.status(404).json({ message: "Sorry No race has been added yet."})
    res.json({races});
})

/**
 * レースを更新するためのPUTリクエストを処理します。
 *
 * @param {import('express').Request} req - Expressのリクエストオブジェクト。
 * @param {import('express').Response} res - Expressのレスポンスオブジェクト。
 * @returns {void}
 * @param {string} req.params.raceCode - レースコードを示すルートパラメータ。
 */
router.put('/:raceCode', (req,res) => {
    const raceCode = req.params.raceCode;
    res.status(501).json({
        message: "Feature Not implemented yet."
    })
})


/**
 * レースを作成するためのPOSTリクエストを処理します。
 *
 * @param {import('express').Request} req - Expressのリクエストオブジェクト。
 * @param {import('express').Response} res - Expressのレスポンスオブジェクト。
 * @returns {Promise<void>}
 * @param {string} req.body.name - レースの名前を示すリクエストボディパラメータ。
 * @param {string} req.body.title - レースのタイトルを示すリクエストボディパラメータ。
 * @param {string[]} req.body.images - レースの画像URLリストを示すリクエストボディパラメータ。
 * @param {Date} [req.body.date] - レースの日付を示すリクエストボディパラメータ（省略可能）。
 * @param {string} req.body.winner - レースの勝者を示すリクエストボディパラメータ。
 * @param {string[]} req.body.participant - レースの参加者リストを示すリクエストボディパラメータ。
 */
router.post('/', async (req,res) => {
    const { name, title, images, date, winner, participant } = req.body;
    const checkRace = await Race.findOne({ name });
    if(checkRace) return res.status(401).json({ message: "Sorry, a race with that name already exist" });
    newRace = new Race({
        name,
        title,
        images,
        date: date || Date.now(),
        winner,
        participant,
    });

    newRace.save()
    .then((data) => {
        res.json({
            message: "New race has been saved.",
            data
        })
    })
    .catch((err) => {
        console.error(err);
        res.json({

        })
    })
})
// Update Race
router.put('/race/:raceCode', (req,res) => {
    res.status(501).json({
        message: "Feature Not implemented yet."
    })
})

module.exports = router;