"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { Home, User, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ROUTES } from "../../lib/constants"

export function NavBar({ items, className }) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const navigate = useNavigate()

  const baseClasses =
    "relative cursor-pointer text-lg font-bold px-10 py-4 rounded-full transition-colors text-foreground/80 hover:text-primary" // taille augmentée
  const activeClasses = "bg-muted text-primary"

  const renderGlow = () => (
    <motion.div
      layoutId="lamp"
      className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
      initial={false}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
        <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
        <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
        <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
      </div>
    </motion.div>
  )

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-10", // pt-10 pour plus d'espace en haut
        className,
      )}
    >
      <div className="flex items-center gap-6 bg-background/5 border border-border backdrop-blur-lg py-3 px-4 rounded-full shadow-2xl" // gap-6, py-3, px-4, shadow-2xl pour agrandir
      >
        {items.map(({ name, url, icon }) => {
          const isActive = activeTab === name

          // Tous les items sont rendus pareil, même si icon est null
          return (
            <Link
              key={name}
              to={url}
              onClick={() => setActiveTab(name)}
              className={cn(baseClasses, isActive && activeClasses)}
            >
              <span className="hidden md:inline">{name}</span>
              <span className="md:hidden">
                {icon ? React.createElement(icon, { size: 18, strokeWidth: 2.5 }) : null}
              </span>
              {isActive && renderGlow()}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// Démo intégrée
export function NavBarDemo() {
  const navItems = [
    { name: "Home", url: "#", icon: Home },
    { name: "About", url: "#", icon: User },
    { name: "Projects", url: "#", icon: Briefcase },
  ]

  return <NavBar items={navItems} />
}


