import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { initialPortfolioData } from '../../data/initialPortfolioData';
import { WashiTape } from './WashiTape';
import { BinderClip } from './BinderClip';
import { PostmarkStamp, EditorialBarcode, CherriesSticker, RibbonBow } from './VintageStamps';
import { GemSticker, SparkleStar, DoodleArrow } from './DoodleArrow';

export const DynamicSticker = ({
  id,
  className = '',
  style = {},
  fallback = {},
  children
}) => {
  const { publishedData } = usePortfolio();
  const appearance = publishedData?.appearance || {};
  const globalStickersEnabled = appearance.scrapbookStickersEnabled !== false;
  const globalWashiEnabled = appearance.washiTapeEnabled !== false;
  const globalClipsEnabled = appearance.binderClipsEnabled !== false;

  // Retrieve individual sticker settings from publishedData or fallback to initialPortfolioData
  const defaultSticker = initialPortfolioData?.appearance?.individualStickers?.[id] || fallback;
  const sticker = {
    ...defaultSticker,
    ...(appearance.individualStickers?.[id] || {})
  };

  // If explicitly hidden by user in Individual Sticker Studio
  if (sticker.visible === false) {
    return null;
  }

  // Check global layer toggles
  if (sticker.category === 'washi' && !globalWashiEnabled) return null;
  if (sticker.category === 'clip' && !globalClipsEnabled) return null;
  if (['gem', 'sparkle', 'sticker', 'stamp'].includes(sticker.category) && !globalStickersEnabled) return null;

  // If wrapping custom children (like custom wax seal or special element)
  if (children) {
    const rotate = sticker.rotate !== undefined ? sticker.rotate : 0;
    return (
      <div
        style={{
          transform: rotate ? `rotate(${rotate}deg)` : undefined,
          ...style
        }}
        className={className}
        data-sticker-id={id}
      >
        {children}
      </div>
    );
  }

  const rotate = sticker.rotate ?? 0;
  const size = sticker.size ?? 32;

  let content = null;

  switch (sticker.type) {
    case 'cherries':
      content = <CherriesSticker size={size} />;
      break;

    case 'ribbon-bow':
      content = <RibbonBow />;
      break;

    case 'sparkle-star':
      content = <SparkleStar size={size} color={sticker.color || '#FDE047'} />;
      break;

    case 'barcode':
      content = <EditorialBarcode />;
      break;

    case 'postmark':
      content = (
        <PostmarkStamp
          text={sticker.text || 'POSTAGE'}
          date={sticker.date || 'VERIFIED'}
          color={sticker.color || '#DC2626'}
          rotate={rotate}
        />
      );
      break;

    case 'washi':
      content = (
        <WashiTape
          color={sticker.color || 'yellow'}
          width={sticker.width || (size > 36 ? '140px' : '90px')}
          height={sticker.height || '24px'}
          rotate={rotate}
        />
      );
      break;

    case 'binder-clip':
      content = <BinderClip type={sticker.color || 'metal-black'} rotate={rotate} />;
      break;

    case 'heart-clip':
      content = <BinderClip type="heart-clip" rotate={rotate} />;
      break;

    case 'arrow':
      content = <DoodleArrow color={sticker.color || '#1E1E24'} rotate={rotate} />;
      break;

    case 'wax-seal':
      content = (
        <div
          style={{ transform: `rotate(${rotate}deg)` }}
          className="w-12 h-12 rounded-full bg-[#FEF08A] border-2 border-[#1A1714] shadow-xs flex flex-col items-center justify-center shrink-0 group-hover:rotate-6 transition-transform"
        >
          <span className="font-editorial font-black text-sm text-amber-950 leading-none">BK</span>
          <span className="text-[6px] font-mono font-bold uppercase text-amber-900">VERIFIED</span>
        </div>
      );
      break;

    default:
      // Gems: diamond, ruby, emerald, amethyst, topaz, pink-moon, butterfly
      content = <GemSticker type={sticker.type || 'diamond'} size={size} />;
      break;
  }

  // WashiTape, PostmarkStamp, and BinderClip handle rotate internally via their rotate prop.
  // For other elements (gem, cherries, ribbon-bow), apply rotation to the wrapper div.
  const isSelfRotating = ['washi', 'clip', 'postmark', 'wax-seal'].includes(sticker.type);
  const wrapperTransform = !isSelfRotating && rotate !== 0 ? `rotate(${rotate}deg)` : undefined;

  return (
    <div
      style={{
        transform: wrapperTransform,
        ...style
      }}
      className={`pointer-events-none select-none inline-block ${className}`}
      data-sticker-id={id}
    >
      {content}
    </div>
  );
};
