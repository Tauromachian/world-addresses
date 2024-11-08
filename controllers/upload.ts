import { FastifyInstance, FastifyRequest } from 'fastify';
import { UploadPayload } from '../types/upload';

import { Country } from '../entities/country';
import { City } from '../entities/city';
import { Region } from '../entities/region';
import { SubRegion } from '../entities/sub-region';

import { Country as TCountry } from '../types/country';
import { Region as TRegion } from '../types/region';
import { SubRegion as TSubRegion } from '../types/sub-region';
import { City as TCity } from '../types/city';
import { QueryFailedError } from 'typeorm';
import { ERROR_CODES } from '../constants/db';

export async function index(fastify: FastifyInstance, req: FastifyRequest) {
  const countryIdsByCode: Record<string, number> = {};
  const regionIdsByCode: Record<string, number> = {};
  const subRegionIdsByCode: Record<string, number> = {};

  const cities: TCity[] = [];

  let countryId;
  let regionId;
  let subRegionId;

  try {
    for (const uploadPayloadItem of req.body as UploadPayload[]) {
      countryId = countryIdsByCode[uploadPayloadItem.countryCode];
      if (!countryId) {
        countryId = await makeCountry(uploadPayloadItem, fastify);

        if (!countryId) continue;

        countryIdsByCode[uploadPayloadItem.countryCode] = countryId;
      }

      regionId = regionIdsByCode[uploadPayloadItem.regionCode];
      if (!regionId) {
        regionId = await makeRegion(uploadPayloadItem, fastify, countryId);

        if (!regionId) continue;

        regionIdsByCode[(uploadPayloadItem.regionCode, regionId)];
      }

      if (!subRegionIdsByCode[`${uploadPayloadItem.regionCode}${uploadPayloadItem.subRegion}`]) {
        subRegionId = await makeSubRegion(uploadPayloadItem, fastify, regionId);

        regionIdsByCode[`${uploadPayloadItem.regionCode}${uploadPayloadItem.subRegion}`] =
          subRegionId;
      }

      cities.push({
        zipcode: uploadPayloadItem.zipCode,
        name: uploadPayloadItem.city,
        subRegionId: subRegionId!,
      });
    }

    return { msg: 'success' };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { message: error.message };
    }

    return error;
  }
}

export async function makeCountry(
  item: UploadPayload,
  fastify: FastifyInstance,
): Promise<number | undefined> {
  if (!item.countryCode) return;

  const countryRepository = fastify.orm.getRepository(Country);

  const countryPayload: TCountry = {
    code: item.countryCode,
  };

  try {
    const newCountry = await countryRepository.save(countryPayload);

    return newCountry.id;
  } catch (error) {
    if (
      error instanceof QueryFailedError &&
      error.driverError.code === ERROR_CODES.UNIQUE_CONSTRAIN_VIOLATION
    ) {
      const oldCountry = await countryRepository.findOneBy(countryPayload);

      return oldCountry!.id;
    }

    throw error;
  }
}

export async function makeRegion(
  item: UploadPayload,
  fastify: FastifyInstance,
  countryId: number,
): Promise<number | undefined> {
  if (!countryId) return;

  const regionRepository = fastify.orm.getRepository(Region);

  const regionPayload: TRegion = {
    code: item.countryCode,
    name: item.stateName,
    countryId,
  };

  try {
    const region = await regionRepository.save(regionPayload);

    return region.id;
  } catch (error) {
    if (
      error instanceof QueryFailedError &&
      error.driverError.code === ERROR_CODES.UNIQUE_CONSTRAIN_VIOLATION
    ) {
      const oldRegion = await regionRepository.findOneBy({ code: regionPayload.code });

      return oldRegion!.id;
    }

    throw error;
  }
}

export async function makeSubRegion(
  item: UploadPayload,
  fastify: FastifyInstance,
  regionId: number,
): Promise<number> {
  const subRegionRepository = fastify.orm.getRepository(SubRegion);

  const subRegionPayload: TSubRegion = {
    name: item.stateName,
    regionId: regionId,
  };

  const subRegion = await subRegionRepository.save(subRegionPayload);

  return subRegion.id;
}

export async function addCities(cities: City[], fastify: FastifyInstance) {
  await fastify.orm.createQueryBuilder().insert().into('City').values(cities).execute();
}
