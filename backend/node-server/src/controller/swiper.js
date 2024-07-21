const prisma = require('../../prisma/prisma')

const uploadSwiper = async(req,res)=>{
    const imagePath = req.file.path.replaceAll('\\', '/'); // For windwos device

    try{
        const swiper =  await prisma.swiper.create({
            data:{
                swiperPath:imagePath
            }
        })
        if(swiper){
            return res.status(500).json({ message: 'swipers found' });
        }
    }catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    
}

const getASwiper = async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const swiper = await prisma.swiper.findUnique({
            where: {
                id: id
            }
        })
        if (swiper) {
            res.status(500).json({ message: 'A swiper found' });
            return swiper
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAllSwiper = async (req, res) => {
    try {
        const swipers = await prisma.swiper.findMany({
            select: { isVisible: true }
        })
        if (swipers) {
            res.status(500).json({ message: 'swipers found' });
            return swipers
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }

}

const changeVisiblity =  async(req,res)=>{
    const id = parseInt(req.params.id)

    try {
        const swiper = await prisma.swiper.update({
            where: { id },
            data: { isVisible: !swiper?.isVisible }, // Update with boolean negation
        });
        if (swiper) {
            // Success message (optional)
            return res.status(200).json({ message: 'Visibility toggled successfully' });
          } else {
            // Handle case where swiper not found
            return res.status(404).json({ message: 'Swiper not found' });
          }
    }catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


const deleteSwipper = async (req, res) => {
    const id = parseInt(req.params.id)
    const swiper = await prisma.swiper.findFirst({
        where: { id: id }
    })
    if (swiper) {
        try {
            const swiper = await prisma.swiper.delete({ where: { id: id } })
            if (swiper) {
                return res.status(500).json({ message: 'swiper deleted' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = {uploadSwiper,getASwiper,getAllSwiper,changeVisiblity,deleteSwipper}