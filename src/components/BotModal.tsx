// components/BotModal.tsx
'use client'

import { Bot } from '@/data/bots'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

type Props = {
  bot: Bot | null
  onClose: () => void
}

export default function BotModal({ bot, onClose }: Props) {
  if (!bot) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white w-full max-w-lg mx-4 rounded-xl p-6 relative z-50 shadow-xl"
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-brand-slate-400 hover:text-brand-slate-700"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-4">
            <h2 className="text-2xl font-bold text-brand-slate-700">{bot.name}</h2>
            <p className="text-sm text-brand-slate-500 mt-1">{bot.tier} Tier</p>
          </div>

          {bot.imageUrl && (
            <Image
              src={bot.imageUrl}
              alt={bot.name}
              width={500}
              height={500}
              className="rounded-xl w-full h-40 object-cover mb-4"
            />
          )}

          <p className="text-brand-slate-600 text-sm mb-4">{bot.description}</p>

          <div className="space-y-2 text-sm text-brand-slate-700">
            <p><strong>Minimum Amount:</strong> {bot.minAmount}</p>
            <p><strong>Performance:</strong> {bot.performance}</p>
            <p><strong>Fee:</strong> {bot.fee}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
